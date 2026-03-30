import Orchestrator from "@/components/Orchestrator";
import {
  CyclingLayers,
  TiltCardA,
  TiltCardB,
  TiltCardC,
} from "@/components/TiltCards";

export default function Home() {
  return (
    <>
      {/* Preloader */}
      <div className="preloader">
        <div className="preloader__counter">
          <div className="preloader__digit-col" data-col="0">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="preloader__digit-col" data-col="1">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="preloader__digit-col" data-col="2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="page-transition-wipe" />
      <div className="noise-overlay" />

      <h1 className="seo-heading">
        GKTK — Semiconductor Housing for Kumamoto
      </h1>

      {/* Navigation */}
      <header className="nav">
        <div className="nav__inner">
          <a className="nav__brand" href="#">
            GKTK
          </a>
          <nav className="nav__links">
            <a className="animated-link" href="#concept">
              <span>Concept</span>
            </a>
            <a className="animated-link" href="#persona">
              <span>Persona</span>
            </a>
            <a className="animated-link" href="#product">
              <span>Product</span>
            </a>
            <a className="animated-link" href="#irr">
              <span>IRR</span>
            </a>
            <a className="animated-link" href="#risk">
              <span>Risk</span>
            </a>
            <a className="animated-link" href="#exit">
              <span>Exit</span>
            </a>
          </nav>
          <button
            className="nav__menu-btn"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <span className="nav__menu-btn-text">Menu</span>
          </button>
        </div>
      </header>

      <main>
        {/* ========== HERO ========== */}
        <section className="hero" id="hero">
          <div className="hero-mask">
            <div className="hero-mask__part" />
            <div className="hero-mask__part" />
          </div>
          <div className="hero__bg">
            <div
              className="image-placeholder"
              data-label="Kumamoto aerial / building exterior"
            />
          </div>
          <div className="hero__heading-wrapper">
            <h2 className="hero__title">
              <span className="text-mask">
                <span className="text-mask__inner">Semiconductor</span>
              </span>
              <span className="text-mask">
                <span className="text-mask__inner">housing for</span>
              </span>
              <span className="text-mask">
                <span className="text-mask__inner">Kumamoto&rsquo;s</span>
              </span>
              <span className="text-mask">
                <span className="text-mask__inner">
                  <span className="hero__accent">next decade</span>
                </span>
              </span>
            </h2>
          </div>
          <div className="hero__bottom">
            <p className="hero__sub">
              <span className="text-mask">
                <span className="text-mask__inner">
                  An integrated accommodation and support platform for the
                  semiconductor supply chain, purpose-built for Singapore-based
                  family offices.
                </span>
              </span>
            </p>
          </div>
        </section>

        {/* ========== TILT-CARD PRESENTATION ========== */}
        <section className="presentation">
          {/* ===== CARD 1: Concept — Type A ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardA id="concept">
                <span className="section-label">What we do</span>
                <h2 className="tilt-card__title">Concept</h2>
                <div className="tilt-card__grid">
                  <div className="tilt-card__grid-item">
                    <h3>Furnished housing</h3>
                    <p>
                      As semiconductor companies scale operations, they require
                      fast, scalable housing solutions for relocated staff — not
                      just proximity to work, but fully move-in-ready units.
                    </p>
                  </div>
                  <div className="tilt-card__grid-item">
                    <h3>Localized support</h3>
                    <p>
                      Taiwanese-speaking staff minimize language barriers and
                      operational friction, handling daily challenges so tenants
                      can focus entirely on work.
                    </p>
                  </div>
                  <div className="tilt-card__grid-item">
                    <h3>Professional management</h3>
                    <p>
                      We handle utilities, maintenance, and daily needs,
                      delivering a turnkey accommodation and support model that
                      enhances tenant stability and efficiency.
                    </p>
                  </div>
                </div>
              </TiltCardA>
            </div>
          </div>

          {/* ===== CARD 2: Persona — Type B ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardB id="persona" variant="dark">
                <span className="section-label">Target tenant</span>
                <h2 className="tilt-card__title">Who we build for</h2>
                <p>
                  Expatriate semiconductor professionals on short- to long-term
                  assignments, often relocating on short notice and requiring
                  immediate, hassle-free housing.
                </p>
                <p>
                  They prioritize fully move-in-ready accommodations that
                  minimize setup and adjustment time. Beyond housing, they value
                  a complete living solution with reliable management and
                  localized support to reduce language and cultural friction,
                  allowing them to focus entirely on work.
                </p>
              </TiltCardB>
            </div>
          </div>

          {/* ===== CARD 3: Product — Type C ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardC id="product" variant="dark">
                <span className="section-label">Our offering</span>
                <h2 className="tilt-card__title">Product &amp; solution</h2>
                <div className="tilt-card__product-grid">
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h4>Design concepts</h4>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h4>Building exterior</h4>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h4>Interior layouts</h4>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h4>Common spaces</h4>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h4>On-the-ground support</h4>
                  </div>
                </div>
              </TiltCardC>
            </div>
          </div>

          {/* ===== CARD 4: IRR Assumptions — Type A ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardA id="irr" align="top">
                <span className="section-label">Financial model</span>
                <h2 className="tilt-card__title">Investment returns</h2>

                <div className="tilt-card__group">
                  <h4 className="tilt-card__group-label">
                    Investment assumptions
                  </h4>
                  {[
                    ["Total investment cost", "¥2,000,000,000"],
                    ["Bank loan (debt)", "¥1,000,000,000"],
                    ["Initial equity investment", "¥1,000,000,000"],
                    ["Annual net cash flow", "¥88,000,000"],
                    ["Holding period", "5 years"],
                    ["Exit sale price (year 5)", "¥2,500,000,000"],
                    ["Loan principal repayment", "¥1,000,000,000"],
                    ["Net exit proceeds (pre-tax)", "¥1,500,000,000"],
                  ].map(([label, value]) => (
                    <div className="tilt-card__row" key={label}>
                      <span className="tilt-card__row-label">{label}</span>
                      <span className="tilt-card__row-line" />
                      <span className="tilt-card__row-value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="tilt-card__group">
                  <h4 className="tilt-card__group-label">
                    Exit and profit calculation
                  </h4>
                  {[
                    ["Total cumulative cash flow (5 years)", "¥440,000,000"],
                    ["Exit capital gain", "¥500,000,000"],
                    ["Total distributable profit", "¥940,000,000"],
                  ].map(([label, value]) => (
                    <div className="tilt-card__row" key={label}>
                      <span className="tilt-card__row-label">{label}</span>
                      <span className="tilt-card__row-line" />
                      <span className="tilt-card__row-value">{value}</span>
                    </div>
                  ))}
                </div>
              </TiltCardA>
            </div>
          </div>

          {/* ===== CARD 5: IRR Returns — Type A ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardA align="top">
                <div className="tilt-card__group">
                  <h4 className="tilt-card__group-label">
                    Waterfall distribution
                  </h4>
                  {[
                    ["Hurdle rate (preferred return)", "7%"],
                    ["Hurdle amount (LP preferred return)", "¥350,000,000"],
                    ["Remaining excess profit", "¥590,000,000"],
                    ["GP carry", "20% / ¥118,000,000"],
                    ["LP share of excess", "80% / ¥472,000,000"],
                  ].map(([label, value]) => (
                    <div className="tilt-card__row" key={label}>
                      <span className="tilt-card__row-label">{label}</span>
                      <span className="tilt-card__row-line" />
                      <span className="tilt-card__row-value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="tilt-card__group tilt-card__group--highlight">
                  <h4 className="tilt-card__group-label">
                    Final investor returns (post 20.42% withholding tax)
                  </h4>
                  <div className="tilt-card__row">
                    <span className="tilt-card__row-label">
                      Investor take-home
                    </span>
                    <span className="tilt-card__row-line" />
                    <span className="tilt-card__row-value">
                      ¥1,654,147,600
                    </span>
                  </div>
                  <div className="tilt-card__row">
                    <span className="tilt-card__row-label">
                      Equity multiple (MOIC)
                    </span>
                    <span className="tilt-card__row-line" />
                    <span className="tilt-card__row-value tilt-card__row-value--accent">
                      1.65x
                    </span>
                  </div>
                  <div className="tilt-card__row">
                    <span className="tilt-card__row-label">Estimated IRR</span>
                    <span className="tilt-card__row-line" />
                    <span className="tilt-card__row-value tilt-card__row-value--accent">
                      10.25%
                    </span>
                  </div>
                </div>
              </TiltCardA>
            </div>
          </div>

          {/* ===== CARD 6: Risk 1–3 — Type C ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardC id="risk" variant="dark" align="top">
                <span className="section-label">Due diligence</span>
                <h2 className="tilt-card__title">
                  Risk factors &amp; hedges
                </h2>

                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h4 className="tilt-card__risk-label">
                    Overreliance on the semiconductor industry
                  </h4>
                  <div className="tilt-card__risk-body">
                    <p>
                      If TSMC slows construction or geopolitical shifts cause
                      production to leave Japan, the property could face high
                      vacancy.
                    </p>
                    <div>
                      <h5 className="tilt-card__hedge-label">Hedge</h5>
                      <p>
                        Kumamoto has already formed a full industry cluster,
                        attracting Sony, Tokyo Electron, ASML, and other global
                        supply chain players. We secure 5-10 year master leases
                        with major supply chain companies.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h4 className="tilt-card__risk-label">
                    Interest rate and currency risk
                  </h4>
                  <div className="tilt-card__risk-body">
                    <p>
                      If the Bank of Japan raises rates significantly, loan
                      costs increase. Continued yen depreciation could erode
                      returns.
                    </p>
                    <div>
                      <h5 className="tilt-card__hedge-label">Hedge</h5>
                      <p>
                        We borrow directly from local Japanese banks in JPY and
                        collect rent in JPY, creating a natural hedge. Lease
                        agreements include inflation-linked adjustment clauses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h4 className="tilt-card__risk-label">
                    Construction cost and delay risk
                  </h4>
                  <div className="tilt-card__risk-body">
                    <p>
                      Japan faces severe labor shortages and rising material
                      costs. Budget overruns or delays could reduce IRR.
                    </p>
                    <div>
                      <h5 className="tilt-card__hedge-label">Hedge</h5>
                      <p>
                        Our local development partner directly engages domestic
                        contractors under fixed-price contracts. Modular and
                        standardized construction methods reduce on-site
                        complexity.
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCardC>
            </div>
          </div>

          {/* ===== CARD 7: Risk 4–6 — Type C ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardC variant="dark" align="top">
                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h4 className="tilt-card__risk-label">Tax efficiency</h4>
                  <div className="tilt-card__risk-body">
                    <p>
                      Japan imposes high taxes on foreign real estate investment,
                      including withholding taxes. Ensuring efficient capital
                      repatriation to Singapore-based SFOs is critical.
                    </p>
                    <div>
                      <h5 className="tilt-card__hedge-label">Hedge</h5>
                      <p>
                        The GKTK structure uses a TK (Tokumei Kumiai / silent
                        partnership) agreement to distribute profits as fees,
                        avoiding double taxation and ensuring tax transparency
                        for investors.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h4 className="tilt-card__risk-label">
                    Competition from major Japanese developers
                  </h4>
                  <div className="tilt-card__risk-body">
                    <p>
                      Companies like Mitsui Fudosan and Mitsubishi Estate are
                      likely eyeing Kumamoto. Larger, newer properties at
                      comparable pricing threaten tenant retention.
                    </p>
                    <div>
                      <h5 className="tilt-card__hedge-label">Hedge</h5>
                      <p>
                        Our assets are deeply integrated with the semiconductor
                        supply chain. Through 5-10 year master leases, we
                        recover the majority of invested capital before
                        competitors complete construction.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h4 className="tilt-card__risk-label">
                    Investor control limitations under GKTK
                  </h4>
                  <div className="tilt-card__risk-body">
                    <p>
                      TK investors cannot interfere with operations without
                      losing tax benefits. Poor decisions by MoreHarvest or the
                      Japanese partner need protective mechanisms.
                    </p>
                    <div>
                      <h5 className="tilt-card__hedge-label">Hedge</h5>
                      <p>
                        The agreement includes negative covenants with trigger
                        mechanisms for material events. CapitaLand serves as
                        both co-investor and operator, acting as a rigorous
                        oversight layer.
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCardC>
            </div>
          </div>

          {/* ===== CARD 8: Exit — Type B ===== */}
          <div className="presentation__card">
            <div className="tilt-card-container">
              <TiltCardB id="exit" variant="light">
                <span className="section-label">Liquidity path</span>
                <h2 className="tilt-card__title">Exit strategy</h2>
                <p>
                  The investment is structured around a 5-year hold with a clear
                  exit path. Upon reaching the target holding period, the
                  property is sold on the open market at an anticipated sale
                  price of ¥2,500,000,000 — yielding net exit proceeds of
                  ¥1,500,000,000 after loan repayment.
                </p>
                <p>
                  Cumulative rental cash flows over the holding period provide
                  ¥440,000,000 in distributable income, while the capital gain
                  at exit adds ¥500,000,000 — for a total distributable profit
                  of ¥940,000,000.
                </p>
                <p>
                  Secondary exit options include refinancing against appreciated
                  asset value, partial stake sales to institutional investors, or
                  conversion to a REIT-eligible structure.
                </p>
              </TiltCardB>
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="footer">
          <div className="footer__email">
            <span className="footer__email-label">Get in touch</span>
            <h2 className="footer__email-heading">
              <a href="mailto:hello@gktk.co">hello@gktk.co</a>
            </h2>
          </div>
          <div className="footer__bottom">
            <div className="footer__brand">GKTK</div>
            <nav className="footer__links">
              <a href="#concept">Concept</a>
              <a href="#persona">Persona</a>
              <a href="#product">Product</a>
              <a href="#irr">IRR</a>
              <a href="#risk">Risk</a>
              <a href="#exit">Exit</a>
            </nav>
            <span className="footer__copy">&copy; 2026 GKTK</span>
          </div>
        </footer>
      </main>

      {/* Menu backdrop blur */}
      <div className="menu-backdrop" />

      {/* Menu overlay */}
      <div className="menu-overlay">
        <a className="menu-overlay__link" href="#concept">
          <span>Concept</span>
        </a>
        <a className="menu-overlay__link" href="#persona">
          <span>Persona</span>
        </a>
        <a className="menu-overlay__link" href="#product">
          <span>Product &amp; solution</span>
        </a>
        <a className="menu-overlay__link" href="#irr">
          <span>IRR</span>
        </a>
        <a className="menu-overlay__link" href="#risk">
          <span>Risk factors</span>
        </a>
        <a className="menu-overlay__link" href="#exit">
          <span>Exit strategy</span>
        </a>
      </div>

      <Orchestrator />
    </>
  );
}
