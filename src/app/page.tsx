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
      <div className="page-transition-wipe" />
      <div className="noise-overlay" />

      {/* Navigation */}
      <header className="navigation">
        <div className="navigation__inner">
          <a className="navigation__icon" href="#" aria-label="Home">
            <img src="/logobase.svg" alt="GKTK" />
          </a>
          <button
            className="navigation__menu-btn"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <svg className="navigation__icon-hamburger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
            <svg className="navigation__icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* ========== HERO ========== */}
        <section className="hero" id="hero">
          <div className="hero__content">
            <h1 className="hero__heading">
              Turnkey living for semiconductor teams in Singapore.
            </h1>
            <p className="hero__subheading">
              Purpose-built accommodation for family offices serving the
              supply chain.
            </p>
            <p className="hero__body">
              Furnished, move-in-ready housing with Taiwanese-speaking
              support staff and professional property management. A complete
              living solution so tenants can focus on work, not settling in.
            </p>
          </div>
        </section>

        {/* ========== TILT-CARD PRESENTATION ========== */}
        <section className="tilt-cards-section">

          {/* ===== tilt-card-1: Persona — Type B ===== */}
          <div className="tilt-cards-section__card" id="persona">
            <div className="tilt-card-container">
              <TiltCardB variant="dark">
                <span className="section-label">Target tenant</span>
                <h2 className="tilt-card__title">Who we build for</h2>
                <p>
                  Tenants are employees from semiconductor companies on short-
                  to long-term assignments. They need to settle in quickly and
                  need &ldquo;move-in-ready&rdquo; accommodations to adapt to a
                  new environment.
                </p>
                <p>
                  This includes fully furnished units, reliable property
                  management, and local support to minimize inconveniences
                  caused by language and cultural differences. An ideal home
                  allows them to focus on work without being distracted by
                  day-to-day matters.
                </p>
              </TiltCardB>
            </div>
          </div>

          {/* ===== tilt-card-2: Product & solution — Type C ===== */}
          <div className="tilt-cards-section__card" id="product">
            <div className="tilt-card-container">
              <TiltCardC variant="dark">
                <span className="section-label">Our offering</span>
                <h2 className="tilt-card__title">Product &amp; solution</h2>
                <div className="tilt-card__product-grid">
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h3>Design concepts</h3>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h3>Building exterior</h3>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h3>Interior layouts</h3>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h3>Common spaces</h3>
                  </div>
                  <div className="tilt-card__product-item">
                    <div className="tilt-card__product-image">
                      <CyclingLayers />
                    </div>
                    <h3>On-the-ground support</h3>
                  </div>
                </div>
              </TiltCardC>
            </div>
          </div>

          {/* ===== tilt-card-3-1: IRR Assumptions — Type A ===== */}
          <div className="tilt-cards-section__card" id="irr">
            <div className="tilt-card-container">
              <TiltCardA align="top">
                <span className="section-label">Financial model</span>
                <h2 className="tilt-card__title">Investment returns</h2>

                <div className="tilt-card__group">
                  <h3 className="tilt-card__group-label">
                    Investment assumptions
                  </h3>
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
                  <h3 className="tilt-card__group-label">
                    Exit and profit calculation
                  </h3>
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

          {/* ===== tilt-card-3-2: IRR Returns — Type A ===== */}
          <div className="tilt-cards-section__card">
            <div className="tilt-card-container">
              <TiltCardA align="top">
                <div className="tilt-card__group">
                  <h3 className="tilt-card__group-label">
                    Waterfall distribution
                  </h3>
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
                  <h3 className="tilt-card__group-label">
                    Final investor returns (post 20.42% withholding tax)
                  </h3>
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

          {/* ===== tilt-card-4-1: Risk factors 1–3 — Type C ===== */}
          <div className="tilt-cards-section__card" id="risk">
            <div className="tilt-card-container">
              <TiltCardC variant="dark" align="top">
                <span className="section-label">Due diligence</span>
                <h2 className="tilt-card__title">
                  Risk factors &amp; hedges
                </h2>

                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h3 className="tilt-card__risk-label">
                    Overreliance on the semiconductor industry
                  </h3>
                  <div className="tilt-card__risk-body">
                    <p>
                      If TSMC slows construction or geopolitical shifts cause
                      production to leave Japan, the property could face high
                      vacancy.
                    </p>
                    <div>
                      <h4 className="tilt-card__hedge-label">Hedge</h4>
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
                  <h3 className="tilt-card__risk-label">
                    Interest rate and currency risk
                  </h3>
                  <div className="tilt-card__risk-body">
                    <p>
                      If the Bank of Japan raises rates significantly, loan
                      costs increase. Continued yen depreciation could erode
                      returns.
                    </p>
                    <div>
                      <h4 className="tilt-card__hedge-label">Hedge</h4>
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
                  <h3 className="tilt-card__risk-label">
                    Construction cost and delay risk
                  </h3>
                  <div className="tilt-card__risk-body">
                    <p>
                      Japan faces severe labor shortages and rising material
                      costs. Budget overruns or delays could reduce IRR.
                    </p>
                    <div>
                      <h4 className="tilt-card__hedge-label">Hedge</h4>
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

          {/* ===== tilt-card-4-2: Risk factors 4–6 — Type C ===== */}
          <div className="tilt-cards-section__card">
            <div className="tilt-card-container">
              <TiltCardC variant="dark" align="top">
                <div className="tilt-card__risk-item">
                  <div className="tilt-card__risk-image">
                    <CyclingLayers />
                  </div>
                  <h3 className="tilt-card__risk-label">Tax efficiency</h3>
                  <div className="tilt-card__risk-body">
                    <p>
                      Japan imposes high taxes on foreign real estate investment,
                      including withholding taxes. Ensuring efficient capital
                      repatriation to Singapore-based SFOs is critical.
                    </p>
                    <div>
                      <h4 className="tilt-card__hedge-label">Hedge</h4>
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
                  <h3 className="tilt-card__risk-label">
                    Competition from major Japanese developers
                  </h3>
                  <div className="tilt-card__risk-body">
                    <p>
                      Companies like Mitsui Fudosan and Mitsubishi Estate are
                      likely eyeing Kumamoto. Larger, newer properties at
                      comparable pricing threaten tenant retention.
                    </p>
                    <div>
                      <h4 className="tilt-card__hedge-label">Hedge</h4>
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
                  <h3 className="tilt-card__risk-label">
                    Investor control limitations under GKTK
                  </h3>
                  <div className="tilt-card__risk-body">
                    <p>
                      TK investors cannot interfere with operations without
                      losing tax benefits. Poor decisions by MoreHarvest or the
                      Japanese partner need protective mechanisms.
                    </p>
                    <div>
                      <h4 className="tilt-card__hedge-label">Hedge</h4>
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

          {/* ===== tilt-card-5: Exit strategy — Type B ===== */}
          <div className="tilt-cards-section__card" id="exit">
            <div className="tilt-card-container">
              <TiltCardB variant="light">
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
            <span className="footer__email-label">Placeholder label</span>
            <p className="footer__email-text">
              <a href="#">placeholder@email.co</a>
            </p>
          </div>
          <div className="footer__bottom">
            <div className="footer__brand">
              <svg width="96" height="40" viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6285 0.019949C26.7622 -0.0788008 32.2671 2.88182 36.4277 8.48493C42.1007 16.1255 47.8368 23.7211 53.5365 31.343C55.6792 34.208 55.7614 35.7705 53.9453 38.1386C52.1674 40.4574 48.2245 40.6817 46.3951 38.4049C43.4615 34.7543 40.6922 30.9768 37.8325 27.2686C34.1889 22.5449 30.5835 17.7905 26.8475 13.138C24.382 10.0674 20.9549 9.38118 17.2412 10.2462C13.795 11.0487 11.6421 13.308 10.3418 16.5418C8.80274 20.3712 10.7595 25.1693 13.781 27.3643C17.189 29.8399 21.9368 29.8886 25.511 27.4986C27.2595 26.3293 28.3497 24.6518 29.0992 22.7762C29.499 21.7755 29.799 21.5837 30.488 22.5255C32.0378 24.6436 33.5706 26.7768 35.1988 28.8361C36.0005 29.8505 36.0138 30.6843 35.2357 31.6968C31.0375 37.1605 25.5269 39.9005 18.4912 39.5611C7.01851 39.0061 -1.17799 28.8136 0.13885 17.0749C1.03033 9.12806 8.11057 1.79307 14.9629 0.459323C16.5019 0.159949 18.0506 -0.0706758 19.6285 0.019949V0.019949Z" fill="url(#footer-logo-grad1)"/>
                <path d="M66.2398 17.8178C64.3486 15.2659 62.4237 12.6872 60.5254 10.0897C60.1924 9.63404 60.5216 9.21591 60.7935 8.83216C64.1659 4.08217 68.6818 1.1553 74.6535 0.688429C83.3027 0.0115549 89.6882 3.61842 93.6783 11.0097C98.6457 20.2121 95.402 31.7459 86.2548 37.1865C77.8029 42.2134 66.0666 39.8559 59.853 31.3321C54.2456 23.6403 48.4829 16.0572 42.8067 8.41279C40.7563 5.65154 40.6697 4.23342 42.2998 2.02968C43.9866 -0.250945 48.0893 -0.417194 49.8213 1.82905C55.104 8.67904 60.3217 15.5765 65.5719 22.4509C66.6034 23.8015 67.6439 25.1459 68.713 26.4671C72.3439 30.9552 78.6269 31.5971 82.8328 27.924C87.4653 23.8784 87.7799 17.5559 83.5562 13.4053C78.313 8.25342 69.6535 10.0215 66.9224 16.7965C66.7951 17.1128 66.8549 17.5309 66.2398 17.8184V17.8178Z" fill="url(#footer-logo-grad2)"/>
                <defs>
                  <linearGradient id="footer-logo-grad1" x1="55.2311" y1="-3.37577e-06" x2="-3.99589" y2="7.21973" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FBB931"/>
                    <stop offset="1" stopColor="#FF8660"/>
                  </linearGradient>
                  <linearGradient id="footer-logo-grad2" x1="96.0004" y1="0.229001" x2="37.2028" y2="7.42172" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FBB931"/>
                    <stop offset="1" stopColor="#FF8660"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="footer__copy">&copy; 2026 Placeholder</span>
          </div>
        </footer>
      </main>

      {/* Menu backdrop blur */}
      <div className="menu-backdrop" />

      {/* Menu overlay */}
      <div className="menu-overlay">
        <a className="menu-overlay__link" href="#hero">
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
