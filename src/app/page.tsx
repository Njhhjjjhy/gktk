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
            <span className="navigation__menu-label">Menu</span>
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
          <div className="footer__bottom">
            <span className="footer__address">12F-5, No.189, Section 2, Keelung Rd. Xinyi District, Taipei City, Taiwan 110.<br />Designed in Taipei, Taiwan</span>
            <span className="footer__copy">&copy; 2026</span>
          </div>
        </footer>
      </main>

      {/* Menu backdrop blur */}
      <div className="menu-backdrop" />

      {/* Menu overlay */}
      <div className="hamburger-menu">
        <a className="hamburger-menu__menu-link" href="#persona">
          <span>01 Persona</span>
        </a>
        <a className="hamburger-menu__menu-link" href="#product">
          <span>02 Product &amp; solution</span>
        </a>
        <a className="hamburger-menu__menu-link" href="#irr">
          <span>03 IRR</span>
        </a>
        <a className="hamburger-menu__menu-link" href="#risk">
          <span>04 Risk factors</span>
        </a>
        <a className="hamburger-menu__menu-link" href="#exit">
          <span>05 Exit strategy</span>
        </a>
      </div>

      <Orchestrator />
    </>
  );
}
