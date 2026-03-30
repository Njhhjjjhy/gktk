"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function QALoader() {
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    const h = window.location.hostname;
    const p = window.location.protocol;
    if (h === "localhost" || h === "127.0.0.1" || p === "file:") {
      setIsLocal(true);
    }
  }, []);

  if (!isLocal) return null;
  return <Script src="/js/qa-breakpoints.js" strategy="lazyOnload" />;
}
