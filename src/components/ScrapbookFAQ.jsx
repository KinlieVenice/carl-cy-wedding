import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need to RSVP?",
    a: "Yes. Please RSVP on or before October 27, 2026 so we can plan everything—from the food and seating to all the little details—just right for you.",
  },
  {
    q: "Is parking available at the venue?",
    a: "Yes, parking is available for guests at the venue. Please note that parking spaces are offered on a first-come, first-served basis.",
  },
  {
    q: "I declined the RSVP but my plans have changed and I can attend now. What should I do?",
    a: "We completely understand that plans can change! Please reach out to us as soon as possible, and we'll do our best to accommodate you based on venue capacity and catering arrangements.",
  },
  {
    q: "What if I RSVP'd but can no longer attend?",
    a: "We'll definitely miss you, but we understand that unexpected things happen. Kindly let us know as soon as possible so we can update our guest list and reallocate your seat.",
  },
  {
    q: "Can I bring a plus one?",
    a: "We would love to celebrate with everyone, but due to limited capacity, we kindly ask that only the guests named on the invitation attend. We truly appreciate your understanding.",
  },
  {
    q: "Am I allowed to take photos and videos during the ceremony?",
    a: "Absolutely! Feel free to capture special moments throughout the day. We simply ask that you remain mindful of other guests and avoid obstructing anyone's view during the ceremony.",
  },
  {
    q: "Can I bring my children to the wedding?",
    a: "As much as we adore your little ones, we've chosen to make our wedding an adults-only celebration. We hope you'll still be able to join us and enjoy a wonderful evening with us.",
  },
  {
    q: "Do you have a gift preference?",
    a: "Your presence at our wedding is truly the greatest gift we could ask for. However, if you would like to bless us with a gift, a monetary contribution would be sincerely appreciated as we begin this new chapter of our lives together.",
  },
];

// One delicate tape strip per card — thin, translucent, refined
const TAPE_CONFIGS = [
  { left: "22px",           top: "-11px", width: "90px",  rotate: "-6deg"  },
  { left: "calc(50% - 50px)", top: "-10px", width: "100px", rotate: "-1deg"  },
  { left: "18px",           top: "-11px", width: "80px",  rotate: "-8deg"  },
  { right: "28px",          top: "-10px", width: "88px",  rotate: "5deg"   },
  { left: "26px",           top: "-11px", width: "76px",  rotate: "-5deg"  },
  { left: "calc(50% - 55px)", top: "-10px", width: "110px", rotate: "2deg"   },
  { left: "20px",           top: "-11px", width: "84px",  rotate: "-7deg"  },
  { right: "22px",          top: "-10px", width: "92px",  rotate: "4deg"   },
];

const ROTATIONS = ["-0.6deg", "0.8deg", "-0.9deg", "0.5deg", "-0.7deg", "0.6deg", "-0.8deg", "0.7deg"];

export default function ScrapbookFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Jost:wght@300;400&display=swap');

        .faq-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .faq-card:hover {
          box-shadow: 0 10px 40px rgba(114,47,55,0.12), 0 2px 8px rgba(0,0,0,0.07) !important;
        }
        .faq-btn { background: none; border: none; cursor: pointer; padding: 0; width: 100%; text-align: left; }
        .faq-chevron {
          color: rgba(114,47,55,0.5);
          transition: transform 0.35s ease, color 0.2s ease;
          flex-shrink: 0;
        }
        .faq-chevron.open { transform: rotate(180deg); color: #722F37; }
        .faq-answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
        .faq-answer.open { grid-template-rows: 1fr; }
        .faq-answer-inner { overflow: hidden; }
      `}</style>

      <section style={{ position: "relative", maxWidth: "660px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ── Cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 1 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const tape = TAPE_CONFIGS[i % TAPE_CONFIGS.length];

            return (
              <div
                key={i}
                className="faq-card"
                style={{
                  position: "relative",
                  background: "#fffdf8",
                  transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)",
                  padding: "1.6rem 1.5rem 1.4rem",
                }}
              >
                {/* Tape — single thin translucent strip */}
                <div style={{
                  position: "absolute",
                  top: tape.top,
                  left: tape.left,
                  right: tape.right,
                  width: tape.width,
                  height: "14px",
                  transform: `rotate(${tape.rotate})`,
                  background: "rgba(114,47,55,0.13)",
                  backdropFilter: "blur(1px)",
                }} />

                {/* Inner border */}
                <div style={{
                  position: "absolute", inset: "9px",
                  border: "1px solid rgba(114,47,55,0.08)",
                  pointerEvents: "none",
                }} />

                {/* Question row */}
                <button
                  className="faq-btn"
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "rgba(114,47,55,0.35)",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                      lineHeight: 1.6,
                    }}>✦</span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "1.12rem",
                      color: "#3d1a1e",
                      letterSpacing: "0.01em",
                      lineHeight: 1.45,
                    }}>
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown size={16} className={`faq-chevron ${isOpen ? "open" : ""}`} />
                </button>

                {/* Divider */}
                <div style={{
                  height: "1px",
                  margin: "0.9rem 0 0",
                  background: "linear-gradient(to right, transparent, rgba(114,47,55,0.1), transparent)",
                }} />

                {/* Answer */}
                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "#6b5c5e",
                      lineHeight: 1.9,
                      paddingTop: "0.85rem",
                      letterSpacing: "0.01em",
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
