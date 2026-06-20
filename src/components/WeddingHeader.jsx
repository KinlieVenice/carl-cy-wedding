import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home",             href: "#home" },
  { label: "Our Story",        href: "#our-story" },
  { label: "Gallery",          href: "#gallery" },
  { label: "Wedding Overview", href: "#wedding-overview" },
  { label: "Wedding Details",  href: "#wedding-details" },
  { label: "Dress Code",       href: "#dress-code" },
  { label: "FAQs",             href: "#faqs" },
];

export default function WeddingHeader({ coupleName = "Carl & Cy", weddingDate = "", onRSVP }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const observerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [...NAV_LINKS, { href: "#home" }]
      .map(l => document.querySelector(l.href))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) {
          const match = NAV_LINKS.find(l => l.href === "#" + hit.target.id);
          if (match) setActiveLink(match.label);
        }
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Jost:wght@300;400&display=swap');

        html { scroll-behavior: smooth; }

        .wh-root {
          font-family: 'Jost', sans-serif;
          background: #fffdf8;
          transition: box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        .wh-root.wh-scrolled {
          background: rgba(255,253,248,0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(114,47,55,0.1), 0 6px 32px rgba(114,47,55,0.07);
        }

        /* ── TOP ROW ── */
        .wh-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px 0;
        }

        .wh-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          flex: 1;
        }

        .wh-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          color: #722F37;
          letter-spacing: 0.06em;
          line-height: 1;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .wh-date {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.52rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #6B7041;
          margin-top: 3px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .wh-rsvp-top {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fffdf8;
          background: #722F37;
          border: none;
          padding: 8px 18px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease, 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .wh-rsvp-top:hover {
          background: #5a2029;
          transform: translateY(-1px);
        }

        /* ornamental separator */
        .wh-sep {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 24px 0;
        }
        .wh-sep-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(114,47,55,0.2) 40%, rgba(107,112,65,0.2) 60%, transparent);
        }
        .wh-sep-ornament {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem;
          color: #722F37;
          opacity: 0.45;
          line-height: 1;
        }

        /* ── NAV ROW ── */
        .wh-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 24px 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .wh-nav::-webkit-scrollbar { display: none; }

        .wh-nav-link {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3a1a1e;
          text-decoration: none;
          padding: 4px 14px;
          position: relative;
          transition: color 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* dot separator between links */
        .wh-nav-link + .wh-nav-link::before {
          content: '·';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(114,47,55,0.25);
          font-size: 0.9rem;
        }

        .wh-nav-link:hover { color: #722F37; }

        .wh-nav-link.active {
          color: #722F37;
        }

        .wh-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 14px;
          right: 14px;
          height: 1.5px;
          background: linear-gradient(90deg, #722F37, #6B7041);
          border-radius: 2px;
        }

        /* bottom rule */
        .wh-bottom-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(114,47,55,0.15) 20%, rgba(107,112,65,0.15) 80%, transparent);
        }

        /* ── HAMBURGER ── */
        .wh-ham {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex-shrink: 0;
        }
        .wh-bar {
          display: block;
          height: 1px;
          background: #722F37;
          transition: all 0.28s ease;
          transform-origin: center;
        }

        /* ── MOBILE MENU ── */
        .wh-mobile {
          background: #fffdf8;
          border-top: 1px solid rgba(114,47,55,0.08);
          padding: 28px 32px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          animation: wh-slide 0.22s ease;
        }
        @keyframes wh-slide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wh-mob-link {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.55rem;
          letter-spacing: 0.05em;
          color: #722F37;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s, letter-spacing 0.2s;
        }
        .wh-mob-link:hover, .wh-mob-link.active { opacity: 1; letter-spacing: 0.08em; }

        .wh-mob-rsvp {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fffdf8;
          background: #722F37;
          border: none;
          padding: 11px 28px;
          cursor: pointer;
          margin-top: 6px;
          transition: background 0.25s;
        }
        .wh-mob-rsvp:hover { background: #5a2029; }
      `}</style>

      <header
        className={`wh-root fixed top-0 left-0 right-0 z-50 ${scrolled ? "wh-scrolled" : ""}`}
      >
        {/* ── TOP ROW: hamburger / logo / RSVP ── */}
        <div className="wh-top">
          {/* mobile hamburger — left */}
          <button
            className="wh-ham lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span
              className="wh-bar"
              style={{
                width: 22,
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="wh-bar"
              style={{ width: 22, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="wh-bar"
              style={{
                width: menuOpen ? 22 : 16,
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>

          {/* logo — center */}
          <a href="#home" className="wh-logo">
            <span className="wh-name">{coupleName}</span>
            {weddingDate && <span className="wh-date">{weddingDate}</span>}
          </a>

          {/* RSVP pill — right (desktop shows here too) */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <button
              className="wh-rsvp-top"
              onClick={() => {
                onRSVP?.();
              }}
            >
              RSVP
            </button>
          </div>
        </div>

        {/* ── ORNAMENTAL SEPARATOR ── */}
        <div className="wh-sep">
          <div className="wh-sep-line" />
          <span className="wh-sep-ornament">✦ ✦ ✦</span>
          <div className="wh-sep-line" />
        </div>

        {/* ── NAV ROW (desktop only) ── */}
        <nav className="wh-nav hidden lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`wh-nav-link ${activeLink === link.label ? "active" : ""}`}
              onClick={() => {
                setActiveLink(link.label);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="wh-bottom-rule" />

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div className="wh-mobile lg:hidden">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 30,
                  background: "linear-gradient(90deg,transparent,#6B7041)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  color: "#722F37",
                  fontSize: "0.8rem",
                  opacity: 0.5,
                }}
              >
                ���
              </span>
              <div
                style={{
                  height: 1,
                  width: 30,
                  background: "linear-gradient(90deg,#6B7041,transparent)",
                }}
              />
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`wh-mob-link ${activeLink === link.label ? "active" : ""}`}
                onClick={() => {
                  setActiveLink(link.label);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              className="wh-mob-rsvp"
              onClick={() => {
                onRSVP?.();
                setMenuOpen(false);
              }}
            >
              RSVP Now
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 4,
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 30,
                  background: "linear-gradient(90deg,transparent,#722F37)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  color: "#722F37",
                  fontSize: "0.8rem",
                  opacity: 0.5,
                }}
              >
                ✦
              </span>
              <div
                style={{
                  height: 1,
                  width: 30,
                  background: "linear-gradient(90deg,#722F37,transparent)",
                }}
              />
            </div>
          </div>
        )}
      </header>

      <div style={{ height: "88px" }} />
    </>
  );
}
