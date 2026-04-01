import Orchestrator from "@/components/Orchestrator";
import {
  CyclingLayers,
  CardB,
  CardC,
} from "@/components/Cards";
import { StickyCardStack } from "@/components/StickyCardStack";

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
              Turnkey semiconductor housing.
            </h1>
            <p className="hero__subheading">
              100 furnished units in Kumamoto with on-site support.
            </p>
            <p className="hero__body">
              Taiwanese-speaking staff handle everything from utilities to
              maintenance. Tenants arrive with a suitcase and start work the
              next day.
            </p>
          </div>
        </section>

        {/* ========== CARD PRESENTATION ========== */}
        <StickyCardStack
          className="cards-section"
          cards={[
            {
              id: "persona",
              content: (
                <div className="card-container">
                  <CardB>
                    <span className="section-label">Tenant persona</span>
                    <h2 className="card__title">Expat engineers relocating on short notice.</h2>
                    <p>
                      Semiconductor professionals arriving for short- to long-term
                      assignments who need to be productive on day one. They do not
                      have time to furnish an apartment, set up utilities, or
                      navigate a foreign language.
                    </p>
                    <div className="card__image-placeholder" />
                  </CardB>
                </div>
              ),
            },
            {
              id: "product",
              content: (
                <div className="card-container">
                  <CardC>
                    <span className="section-label">Our offering</span>
                    <h2 className="card__title">Product &amp; solution</h2>
                    <div className="card__product-grid">
                      <div className="card__product-item">
                        <div className="card__product-image">
                          <CyclingLayers />
                        </div>
                        <h3>Design concepts</h3>
                      </div>
                      <div className="card__product-item">
                        <div className="card__product-image">
                          <CyclingLayers />
                        </div>
                        <h3>Building exterior</h3>
                      </div>
                      <div className="card__product-item">
                        <div className="card__product-image">
                          <CyclingLayers />
                        </div>
                        <h3>Interior layouts</h3>
                      </div>
                      <div className="card__product-item">
                        <div className="card__product-image">
                          <CyclingLayers />
                        </div>
                        <h3>Common spaces</h3>
                      </div>
                      <div className="card__product-item">
                        <div className="card__product-image">
                          <CyclingLayers />
                        </div>
                        <h3>On-the-ground support</h3>
                      </div>
                    </div>
                  </CardC>
                </div>
              ),
            },
            {
              id: "irr",
              content: (
                <div className="card-container">
                  <CardB>
                    <span className="section-label">Financial model</span>
                    <h2 className="card__title">Investment returns.</h2>
                    <p>
                      10.25% post-tax IRR over a 5-year hold. Investors deploy 1
                      billion yen in equity alongside 1 billion yen in bank debt.
                      Annual cash flow of 88 million yen plus a year-five exit at
                      2.5 billion yen produces 940 million yen in distributable
                      profit.
                    </p>

                    <div className="card__group">
                      <h3 className="card__group-label">
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
                        <div className="card__row" key={label}>
                          <span className="card__row-label">{label}</span>
                          <span className="card__row-line" />
                          <span className="card__row-value">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card__group">
                      <h3 className="card__group-label">
                        Exit and profit calculation
                      </h3>
                      {[
                        ["Total cumulative cash flow (5 years)", "¥440,000,000"],
                        ["Exit capital gain", "¥500,000,000"],
                        ["Total distributable profit", "¥940,000,000"],
                      ].map(([label, value]) => (
                        <div className="card__row" key={label}>
                          <span className="card__row-label">{label}</span>
                          <span className="card__row-line" />
                          <span className="card__row-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardB>
                </div>
              ),
            },
            {
              content: (
                <div className="card-container">
                  <CardB>
                    <span className="section-label">Financial model</span>
                    <h2 className="card__title">Investor returns</h2>

                    <div className="card__group">
                      <h3 className="card__group-label">
                        Waterfall distribution
                      </h3>
                      {[
                        ["Hurdle rate (preferred return)", "7%"],
                        ["Hurdle amount (LP preferred return)", "¥350,000,000"],
                        ["Remaining excess profit", "¥590,000,000"],
                        ["GP carry", "20% / ¥118,000,000"],
                        ["LP share of excess", "80% / ¥472,000,000"],
                      ].map(([label, value]) => (
                        <div className="card__row" key={label}>
                          <span className="card__row-label">{label}</span>
                          <span className="card__row-line" />
                          <span className="card__row-value">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card__group card__group--highlight">
                      <h3 className="card__group-label">
                        Final investor returns (post 20.42% withholding tax)
                      </h3>
                      <div className="card__row">
                        <span className="card__row-label">
                          Investor take-home
                        </span>
                        <span className="card__row-line" />
                        <span className="card__row-value">
                          ¥1,654,147,600
                        </span>
                      </div>
                      <div className="card__row">
                        <span className="card__row-label">
                          Equity multiple (MOIC)
                        </span>
                        <span className="card__row-line" />
                        <span className="card__row-value card__row-value--accent">
                          1.65x
                        </span>
                      </div>
                      <div className="card__row">
                        <span className="card__row-label">Estimated IRR</span>
                        <span className="card__row-line" />
                        <span className="card__row-value card__row-value--accent">
                          10.25%
                        </span>
                      </div>
                    </div>
                  </CardB>
                </div>
              ),
            },
            {
              id: "risk",
              content: (
                <div className="card-container">
                  <CardB>
                    <span className="section-label">Risk factors and hedges</span>
                    <h2 className="card__title">Risk factors.</h2>
                    <p>Every risk has a built-in hedge.</p>
                    <div className="card__group">
                      <h3 className="card__group-label">TSMC slows or leaves Japan.</h3>
                      <p>Full cluster: Sony, TEL, ASML. Master leases lock 5 to 10 years of income.</p>
                    </div>
                    <div className="card__group">
                      <h3 className="card__group-label">Interest rates rise. Yen weakens.</h3>
                      <p>JPY debt and JPY rent create a natural hedge. Inflation-linked lease clauses.</p>
                    </div>
                    <div className="card__group">
                      <h3 className="card__group-label">Construction overruns or delays.</h3>
                      <p>Fixed-price contracts. Modular construction reduces complexity.</p>
                    </div>
                  </CardB>
                </div>
              ),
            },
            {
              content: (
                <div className="card-container">
                  <CardB>
                    <span className="section-label">Risk factors and hedges</span>
                    <h2 className="card__title">Risk factors.</h2>
                    <p>Every risk has a built-in hedge.</p>
                    <div className="card__group">
                      <h3 className="card__group-label">High foreign investor tax burden.</h3>
                      <p>TK structure distributes profits as fees, avoiding double taxation.</p>
                    </div>
                    <div className="card__group">
                      <h3 className="card__group-label">Major developers enter Kumamoto.</h3>
                      <p>Supply-chain integration plus lease lock-in recovers capital before competitors finish.</p>
                    </div>
                    <div className="card__group">
                      <h3 className="card__group-label">Investors have no operational control.</h3>
                      <p>Negative covenants trigger approval for material events. CapitaLand oversight.</p>
                    </div>
                  </CardB>
                </div>
              ),
            },
            {
              id: "exit",
              content: (
                <div className="card-container">
                  <CardB>
                    <span className="section-label">Exit strategy</span>
                    <h2 className="card__title">Exit strategy.</h2>
                    <p>
                      Three paths to liquidity after year five. The default exit is
                      a sale to CapitaLand REITs or institutional funds that favour
                      stabilized, income-producing assets. If semiconductor demand
                      plateaus, the building can be repositioned as a business hotel
                      or premium rental apartments. A partial exit through
                      refinancing or stake sales is also available.
                    </p>
                  </CardB>
                </div>
              ),
            },
          ]}
        />

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
