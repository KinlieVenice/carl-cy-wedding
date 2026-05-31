import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#our-story" },
  { label: "Wedding Details", href: "#wedding-details" },
  { label: "FAQs", href: "#faqs" },
  { label: "RSVP", href: "#rsvp", isRsvp: true },
];

export default function WeddingHeader({
  coupleName = "Carl & Cy",
  weddingDate = "",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=EB+Garamond:wght@400;500&family=Jost:wght@300;400;500&display=swap');

        .header-root {
          font-family: 'Jost', sans-serif;
        }

        .couple-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          color: #390000;
          letter-spacing: 0.03em;
          line-height: 1;
        }

        .wedding-date {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          letter-spacing: 0.25em;
          color: #8c8a45;
          font-size: 0.6rem;
          text-transform: uppercase;
        }

        .nav-link {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.18em;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #390000;
          position: relative;
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #8c8a45;
          transition: width 0.35s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #8c8a45;
        }

        .nav-link.active {
          color: #8c8a45;
        }

        .rsvp-btn {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.2em;
          font-size: 0.68rem;
          text-transform: uppercase;
          color: #390000;
          border: 1px solid #8c8a45;
          padding: 8px 22px;
          background: transparent;
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }

        .rsvp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #390000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
          z-index: 0;
        }

        .rsvp-btn:hover::before {
          transform: scaleX(1);
        }

        .rsvp-btn span {
          position: relative;
          z-index: 1;
          transition: color 0.35s ease;
        }

        .rsvp-btn:hover span {
          color: #fff;
        }

        .ornament {
          color: #8c8a45;
          font-family: 'Cormorant Garamond', serif;
          opacity: 0.7;
          font-size: 1.1rem;
          line-height: 1;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #8c8a45 30%, #8c8a45 70%, transparent);
          opacity: 0.45;
        }

        .mobile-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0.06em;
          font-size: 1.5rem;
          color: #390000;
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .mobile-nav-link:hover {
          color: #8c8a45;
        }

        .hamburger-bar {
          display: block;
          width: 22px;
          height: 1px;
          background: #390000;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .header-shadow {
          box-shadow: 0 1px 20px rgba(57, 0, 0, 0.06);
        }

        .mobile-menu-overlay {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header
        className={`header-root fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${
          scrolled ? "header-shadow" : ""
        }`}
      >
        {/* Top ornamental line */}
        <div className="divider-line" />

        <div className="mx-auto px-6 md:px-10 lg:px-16">
          {/* Main header row */}
          <div className="flex items-center justify-between py-4 md:py-5">
            {/* Logo / Couple Name */}
            <a
              href="#home"
              className="flex flex-col items-start gap-1 no-underline"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center gap-2">
                <span className="ornament">✦</span>
                <span className="couple-name text-3xl md:text-4xl">
                  {coupleName}
                </span>
                <span className="ornament">✦</span>
              </div>
              {weddingDate && (
                <span className="wedding-date pl-6">{weddingDate}</span>
              )}
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.filter((l) => !l.isRsvp).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link ${activeLink === link.label ? "active" : ""}`}
                  onClick={() => setActiveLink(link.label)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#rsvp"
                className="rsvp-btn"
                onClick={() => setActiveLink("RSVP")}
              >
                <span>RSVP</span>
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="hamburger-bar"
                style={{
                  transform: menuOpen
                    ? "translateY(5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="hamburger-bar"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="hamburger-bar"
                style={{
                  transform: menuOpen
                    ? "translateY(-9px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>

          {/* Desktop bottom nav divider */}
          <div className="hidden lg:block divider-line" />
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu-overlay lg:hidden bg-white border-t border-stone-100 px-6 py-10 flex flex-col items-center gap-7">
            {/* Ornament top */}
            <div className="flex items-center gap-3 mb-2">
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "#8c8a45",
                  opacity: 0.5,
                }}
              />
              <span className="ornament text-sm">✦</span>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "#8c8a45",
                  opacity: 0.5,
                }}
              />
            </div>

            {NAV_LINKS.map((link) =>
              link.isRsvp ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="rsvp-btn mt-2"
                  onClick={() => {
                    setActiveLink("RSVP");
                    setMenuOpen(false);
                  }}
                >
                  <span>RSVP</span>
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ),
            )}

            {/* Ornament bottom */}
            <div className="flex items-center gap-3 mt-2">
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "#8c8a45",
                  opacity: 0.5,
                }}
              />
              <span className="ornament text-sm">✦</span>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "#8c8a45",
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        )}

        {/* Bottom ornamental line */}
        {!menuOpen && <div className="divider-line" />}
      </header>

      {/* Spacer so page content doesn't hide under fixed header */}
      <div style={{ height: "90px" }} />
    </>
  );
}
