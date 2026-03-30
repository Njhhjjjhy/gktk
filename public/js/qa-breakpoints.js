/* ============================================================
   QA Breakpoint Preview Tool
   Dev-only responsive testing overlay
   Zero dependencies — single IIFE
   ============================================================ */
(function () {
  "use strict";

  // Bail out inside the iframe preview
  if (window.location.search.indexOf("_qa=1") !== -1) return;

  // Bail out if not localhost
  var h = window.location.hostname;
  var p = window.location.protocol;
  if (h !== "localhost" && h !== "127.0.0.1" && p !== "file:") return;

  /* ----------------------------------------------------------
     Project breakpoints (scraped from globals.css)
     ---------------------------------------------------------- */
  var breakpoints = [
    { px: 1100, dir: "max", label: "Tablet — grid collapse, smaller type" },
    { px: 767, dir: "max", label: "Mobile — vertical flow, nav hidden" }
  ];

  /* ----------------------------------------------------------
     Device presets
     ---------------------------------------------------------- */
  var devices = [
    { name: "iPhone 17 Pro", w: 393, h: 852 },
    { name: "iPhone SE", w: 375, h: 667 },
    { name: "iPad mini", w: 744, h: 1133 },
    { name: "iPad Air", w: 820, h: 1180 },
    { name: "iPad Pro 11\"", w: 834, h: 1194 },
    { name: "iPad Pro 13\"", w: 1024, h: 1366 },
    { name: "Laptop 13\"", w: 1280, h: 800 },
    { name: "Desktop", w: 1440, h: 900 },
    { name: "Desktop LG", w: 1920, h: 1080 }
  ];

  /* ----------------------------------------------------------
     State
     ---------------------------------------------------------- */
  var isOpen = false;
  var currentW = devices[0].w;
  var currentH = devices[0].h;
  var currentDevice = devices[0].name;
  var isMac = navigator.platform.indexOf("Mac") !== -1;

  /* ----------------------------------------------------------
     Inject styles
     ---------------------------------------------------------- */
  var style = document.createElement("style");
  style.textContent = [
    /* overlay */
    "#qa-overlay{position:fixed;inset:0;z-index:200000;display:none;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:#c5c8d0;}",
    "#qa-overlay.qa-open{display:flex;}",

    /* toolbar */
    "#qa-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:8px 12px;background:#1e2027;border-bottom:1px solid #2a2d35;z-index:1;}",
    "#qa-toolbar button,#qa-toolbar input{font-family:inherit;font-size:12px;border:none;outline:none;cursor:pointer;}",

    /* device buttons */
    ".qa-device-btn{padding:4px 10px;border-radius:4px;background:#2a2d35;color:#9ca0ab;transition:background .15s,color .15s;}",
    ".qa-device-btn:hover{background:#33363f;color:#e0e2e8;}",
    ".qa-device-btn.qa-active{background:#0F6466;color:#fff;}",

    /* breakpoint pills */
    ".qa-bp-pill{padding:3px 8px;border-radius:10px;background:#2a2d35;color:#8b8f9a;font-size:11px;transition:background .15s,color .15s;cursor:pointer;border:1px solid transparent;}",
    ".qa-bp-pill:hover{background:#33363f;color:#c5c8d0;}",
    ".qa-bp-pill.qa-bp-active{background:#0a4344;color:#2dd4bf;border-color:#0F6466;}",

    /* separator */
    ".qa-sep{width:1px;height:20px;background:#2a2d35;margin:0 4px;}",

    /* inputs */
    ".qa-dim-input{width:60px;padding:4px 6px;border-radius:4px;background:#2a2d35;color:#c5c8d0;text-align:center;border:1px solid #33363f !important;}",
    ".qa-dim-input:focus{border-color:#0F6466 !important;}",
    ".qa-apply-btn{padding:4px 10px;border-radius:4px;background:#0F6466;color:#fff;transition:background .15s;}",
    ".qa-apply-btn:hover{background:#0d5557;}",
    ".qa-rotate-btn{padding:4px 8px;border-radius:4px;background:#2a2d35;color:#9ca0ab;font-size:14px;transition:background .15s;}",
    ".qa-rotate-btn:hover{background:#33363f;color:#e0e2e8;}",

    /* dimension label */
    ".qa-dim-label{color:#6b7280;font-size:12px;margin-left:auto;white-space:nowrap;}",

    /* close button */
    ".qa-close-btn{margin-left:8px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:4px;background:#2a2d35;color:#9ca0ab;font-size:16px;line-height:1;transition:background .15s,color .15s;}",
    ".qa-close-btn:hover{background:#ef4444;color:#fff;}",

    /* viewport area */
    "#qa-viewport{flex:1;position:relative;overflow:hidden;background:#111216;background-image:radial-gradient(circle,#2a2d35 1px,transparent 1px);background-size:24px 24px;display:flex;align-items:center;justify-content:center;}",

    /* iframe wrapper */
    "#qa-frame-wrap{border:1px solid #2a2d35;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.5);background:#fff;transition:width .3s cubic-bezier(.4,0,.2,1),height .3s cubic-bezier(.4,0,.2,1);}",
    "#qa-frame{border:none;display:block;width:100%;height:100%;background:#fff;}",

    /* trigger button */
    "#qa-trigger{position:fixed;bottom:16px;right:16px;z-index:199999;width:40px;height:40px;border-radius:50%;background:#0F6466;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.35);transition:transform .15s,box-shadow .15s;border:none;outline:none;}",
    "#qa-trigger:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(0,0,0,.45);}"
  ].join("\n");
  document.head.appendChild(style);

  /* ----------------------------------------------------------
     Build DOM
     ---------------------------------------------------------- */

  // Floating trigger
  var trigger = document.createElement("button");
  trigger.id = "qa-trigger";
  trigger.textContent = "QA";
  trigger.title = "QA Breakpoints (" + (isMac ? "\u2318" : "Ctrl") + "+Shift+Q)";
  document.body.appendChild(trigger);

  // Overlay
  var overlay = document.createElement("div");
  overlay.id = "qa-overlay";

  // Toolbar
  var toolbar = document.createElement("div");
  toolbar.id = "qa-toolbar";
  overlay.appendChild(toolbar);

  // Device buttons
  var deviceBtns = [];
  for (var i = 0; i < devices.length; i++) {
    (function (dev, idx) {
      var btn = document.createElement("button");
      btn.className = "qa-device-btn";
      btn.textContent = dev.name;
      btn.onclick = function () { selectDevice(idx); };
      toolbar.appendChild(btn);
      deviceBtns.push(btn);
    })(devices[i], i);
  }

  // Separator
  toolbar.appendChild(makeSep());

  // Breakpoint pills
  var bpPills = [];
  for (var b = 0; b < breakpoints.length; b++) {
    (function (bp) {
      var pill = document.createElement("button");
      pill.className = "qa-bp-pill";
      pill.textContent = bp.px + "px " + bp.dir;
      pill.title = bp.label;
      pill.onclick = function () { setSize(bp.px, currentH, null); };
      toolbar.appendChild(pill);
      bpPills.push(pill);
    })(breakpoints[b]);
  }

  // Separator
  toolbar.appendChild(makeSep());

  // Width input
  var wInput = document.createElement("input");
  wInput.type = "number";
  wInput.className = "qa-dim-input";
  wInput.value = currentW;
  toolbar.appendChild(wInput);

  var timesLabel = document.createElement("span");
  timesLabel.textContent = "\u00d7";
  timesLabel.style.cssText = "color:#6b7280;margin:0 2px;";
  toolbar.appendChild(timesLabel);

  // Height input
  var hInput = document.createElement("input");
  hInput.type = "number";
  hInput.className = "qa-dim-input";
  hInput.value = currentH;
  toolbar.appendChild(hInput);

  // Apply button
  var applyBtn = document.createElement("button");
  applyBtn.className = "qa-apply-btn";
  applyBtn.textContent = "Apply";
  applyBtn.onclick = function () { applyInputs(); };
  toolbar.appendChild(applyBtn);

  // Enter key on inputs
  wInput.onkeydown = hInput.onkeydown = function (e) {
    if (e.key === "Enter" || e.keyCode === 13) applyInputs();
  };

  // Rotate button
  var rotateBtn = document.createElement("button");
  rotateBtn.className = "qa-rotate-btn";
  rotateBtn.textContent = "\u21c4";
  rotateBtn.title = "Rotate (swap width \u2194 height)";
  rotateBtn.onclick = function () { setSize(currentH, currentW, null); };
  toolbar.appendChild(rotateBtn);

  // Dimension label
  var dimLabel = document.createElement("span");
  dimLabel.className = "qa-dim-label";
  toolbar.appendChild(dimLabel);

  // Close button
  var closeBtn = document.createElement("button");
  closeBtn.className = "qa-close-btn";
  closeBtn.textContent = "\u00d7";
  closeBtn.onclick = function () { toggle(false); };
  toolbar.appendChild(closeBtn);

  // Viewport area
  var viewport = document.createElement("div");
  viewport.id = "qa-viewport";
  overlay.appendChild(viewport);

  // Frame wrapper
  var frameWrap = document.createElement("div");
  frameWrap.id = "qa-frame-wrap";
  viewport.appendChild(frameWrap);

  // Iframe
  var frame = document.createElement("iframe");
  frame.id = "qa-frame";
  var frameSrc = window.location.href;
  if (frameSrc.indexOf("?") !== -1) {
    frameSrc += "&_qa=1";
  } else {
    frameSrc += "?_qa=1";
  }
  frame.src = frameSrc;
  frameWrap.appendChild(frame);

  document.body.appendChild(overlay);

  /* ----------------------------------------------------------
     Helpers
     ---------------------------------------------------------- */
  function makeSep() {
    var s = document.createElement("span");
    s.className = "qa-sep";
    return s;
  }

  function setSize(w, h, deviceName) {
    currentW = parseInt(w, 10) || 320;
    currentH = parseInt(h, 10) || 568;
    currentDevice = deviceName || findDeviceName(currentW, currentH);
    frameWrap.style.width = currentW + "px";
    frameWrap.style.height = currentH + "px";
    wInput.value = currentW;
    hInput.value = currentH;
    updateUI();
  }

  function findDeviceName(w, h) {
    for (var i = 0; i < devices.length; i++) {
      var d = devices[i];
      if ((d.w === w && d.h === h) || (d.w === h && d.h === w)) return d.name;
    }
    return "Custom";
  }

  function selectDevice(idx) {
    var d = devices[idx];
    setSize(d.w, d.h, d.name);
  }

  function applyInputs() {
    setSize(parseInt(wInput.value, 10), parseInt(hInput.value, 10), null);
  }

  function updateUI() {
    // Device buttons
    for (var i = 0; i < deviceBtns.length; i++) {
      var d = devices[i];
      var match = (d.w === currentW && d.h === currentH) || (d.w === currentH && d.h === currentW);
      deviceBtns[i].className = "qa-device-btn" + (match ? " qa-active" : "");
    }
    // Breakpoint pills
    for (var b = 0; b < breakpoints.length; b++) {
      var bp = breakpoints[b];
      var active = false;
      if (bp.dir === "max") active = currentW <= bp.px;
      if (bp.dir === "min") active = currentW >= bp.px;
      bpPills[b].className = "qa-bp-pill" + (active ? " qa-bp-active" : "");
    }
    // Dimension label
    dimLabel.textContent = currentDevice + " \u2014 " + currentW + " \u00d7 " + currentH;
  }

  function toggle(forceOpen) {
    isOpen = typeof forceOpen === "boolean" ? forceOpen : !isOpen;
    if (isOpen) {
      overlay.className = "qa-open";
    } else {
      overlay.className = "";
    }
  }

  /* ----------------------------------------------------------
     Initial sizing
     ---------------------------------------------------------- */
  setSize(devices[0].w, devices[0].h, devices[0].name);

  /* ----------------------------------------------------------
     Events
     ---------------------------------------------------------- */
  trigger.onclick = function () { toggle(); };

  document.addEventListener("keydown", function (e) {
    var mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.shiftKey && (e.key === "q" || e.key === "Q" || e.keyCode === 81)) {
      e.preventDefault();
      toggle();
    }
  });
})();
