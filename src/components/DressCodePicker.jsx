import { useState } from "react";

const categories = {
  "Parents of Bride": {
    colors: [
      { hex: "#6c3f2e", name: "Brown" },
      { hex: "#734f3d", name: "Gray Brown" },
      { hex: "#826652", name: "Gray Orange" },
    ],
    icon: "👑",
  },
  "Principal Sponsors": {
    colors: [
      { hex: "#f3e0c7", name: "Light Orange" },
      { hex: "#d8c1a5", name: "Pastel Gray" },
      { hex: "#b8a28e", name: "Gray Orange" },
    ],
    icon: "💍",
  },
  "Secondary Sponsors": {
    colors: [{ hex: "#808000", name: "Dark Olive" }],
    icon: "🌿",
  },
  Guests: {
    colors: [
      { hex: "#cdc1ba", name: "Pastel Gray" },
      { hex: "#8f8177", name: "Gray Orange" },
      { hex: "#d1aba6", name: "Pastel Gray Red" },
      { hex: "#6f3b3e", name: "Gray Red" },
      { hex: "#a7a376", name: "Gray Yellow" },
      { hex: "#414224", name: "Dark Olive" },
      { hex: "#c2a35a", name: "Gold" },
      { hex: "#844f39", name: "Brown" },
    ],
    icon: "🎀",
  },
};

const categoryKeys = Object.keys(categories);

export default function DressCodePicker() {
  const [selectedCategory, setSelectedCategory] = useState("Parents of Bride");
  const [selectedColor, setSelectedColor] = useState(
    categories["Parents of Bride"].colors[0],
  );
  const [animKey, setAnimKey] = useState(0);

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setSelectedColor(categories[category].colors[0]);
    setAnimKey((k) => k + 1);
  };

  const handleColorChange = (color) => {
    if (color.hex === selectedColor.hex) return;
    setSelectedColor(color);
    setAnimKey((k) => k + 1);
  };

  const cat = categories[selectedCategory];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Jost:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .gr {
          min-height: 100vh;
          background: #0a0705;
          background-image: radial-gradient(ellipse at 50% 0%, #261508 0%, transparent 65%), radial-gradient(ellipse at 50% 100%, #180e04 0%, transparent 65%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 3rem;
          font-family: 'Jost', sans-serif;
          position: relative;
        }

        .gh {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .gt {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          color: #c9a25a;
          letter-spacing: 0.06em;
          text-shadow: 0 0 28px rgba(201,162,90,0.4);
        }

        .go {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin: 0.4rem 0;
          color: rgba(201,162,90,0.35);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
        }
        .go::before, .go::after {
          content: '';
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,162,90,0.35), transparent);
        }

        .gs {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          color: rgba(201,162,90,0.4);
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }

        .gl {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 1.8rem;
          width: 100%;
          max-width: 800px;
          align-items: start;
        }

        .cp {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .pl {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          color: rgba(201,162,90,0.38);
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          padding-left: 2px;
        }

        .cb {
          position: relative;
          background: linear-gradient(135deg, #1a1108 0%, #100b04 100%);
          border: 1px solid rgba(201,162,90,0.13);
          border-radius: 7px;
          cursor: pointer;
          padding: 0.75rem 0.9rem;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          transition: all 0.18s;
          overflow: hidden;
        }

        .cb:hover { border-color: rgba(201,162,90,0.3); transform: translateX(3px); background: linear-gradient(135deg, #201508 0%, #140e05 100%); }

        .cb.ca {
          background: linear-gradient(135deg, #281a08 0%, #180f04 100%);
          border-color: rgba(201,162,90,0.55);
          box-shadow: 0 0 14px rgba(201,162,90,0.1), inset 0 1px 0 rgba(201,162,90,0.08);
        }

        .cb.ca::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #a07830, #f0d080, #a07830);
          border-radius: 3px 0 0 3px;
        }

        .ci { font-size: 1.15rem; line-height: 1; }

        .cn {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.88rem;
          font-weight: 400;
          color: #c8a858;
          letter-spacing: 0.03em;
          line-height: 1.3;
        }
        .cb.ca .cn { color: #f0d080; }

        .cc {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          color: rgba(201,162,90,0.35);
          margin-top: 1px;
          letter-spacing: 0.1em;
        }
        .cb.ca .cc { color: rgba(240,208,128,0.5); }

        .sc {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .ds {
          position: relative;
          width: 100%;
          max-width: 360px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(201,162,90,0.18);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.9), 0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,162,90,0.08);
        }

        .dc { position: absolute; width: 18px; height: 18px; z-index: 5; pointer-events: none; }
        .dc.tl { top: 7px; left: 7px; border-top: 1.5px solid rgba(201,162,90,0.45); border-left: 1.5px solid rgba(201,162,90,0.45); }
        .dc.tr { top: 7px; right: 7px; border-top: 1.5px solid rgba(201,162,90,0.45); border-right: 1.5px solid rgba(201,162,90,0.45); }
        .dc.bl { bottom: 42px; left: 7px; border-bottom: 1.5px solid rgba(201,162,90,0.45); border-left: 1.5px solid rgba(201,162,90,0.45); }
        .dc.br { bottom: 42px; right: 7px; border-bottom: 1.5px solid rgba(201,162,90,0.45); border-right: 1.5px solid rgba(201,162,90,0.45); }

        .db {
          width: 100%;
          aspect-ratio: 3/4;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.5s ease;
          position: relative;
          padding: 1rem;
        }

        .db::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.35) 0%, transparent 55%);
          pointer-events: none;
        }

        .di {
          height: 82%;
          width: 82%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 10px 28px rgba(0,0,0,0.5));
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.3s ease forwards; }

        .dib {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.9rem;
          background: rgba(0,0,0,0.65);
          border-top: 1px solid rgba(201,162,90,0.12);
          position: relative;
          z-index: 3;
        }

        .dic {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: rgba(201,162,90,0.55);
          text-transform: uppercase;
        }

        .din {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          font-weight: 400;
          color: #f0e0c0;
          letter-spacing: 0.02em;
        }

        .dih {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          color: rgba(201,162,90,0.38);
          letter-spacing: 0.06em;
        }

        .sp {
          background: linear-gradient(135deg, #1a1108 0%, #100b04 100%);
          border: 1px solid rgba(201,162,90,0.13);
          border-radius: 9px;
          padding: 0.9rem 1.1rem;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.45);
        }

        .sh {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          font-weight: 300;
          letter-spacing: 0.28em;
          color: rgba(201,162,90,0.38);
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .sh::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(201,162,90,0.18), transparent); }

        .sw { display: flex; flex-wrap: wrap; gap: 0.6rem; }

        .swb {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          transition: transform 0.18s;
        }
        .swb:hover { transform: translateY(-4px); }

        .swc {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.07);
          transition: all 0.22s;
          position: relative;
        }

        .swb.sel .swc {
          border: 2px solid #c9a25a;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.8), 0 0 0 4.5px rgba(201,162,90,0.45), 0 0 14px rgba(201,162,90,0.25);
          transform: scale(1.12);
        }

        .swb.sel .swc::before {
          content: '♦';
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          color: #c9a25a;
          text-shadow: 0 0 8px rgba(201,162,90,0.9);
        }

        .swl {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          color: rgba(201,162,90,0.4);
          text-align: center;
          max-width: 52px;
          line-height: 1.3;
          letter-spacing: 0.04em;
        }
        .swb.sel .swl { color: rgba(201,162,90,0.75); }

        @media (max-width: 560px) {
          .gl { grid-template-columns: 1fr; }
          .cp { display: grid; grid-template-columns: 1fr 1fr; }
          .pl { grid-column: 1/-1; }
          .cb.ca::after { display: none; }
          .cb.ca { border-bottom: 2px solid rgba(201,162,90,0.55); }
          .ds, .sp { max-width: 100%; }
        }

        @media (min-width: 768px) {
          .gl { max-width: 1000px; grid-template-columns: 260px 1fr; gap: 2.4rem; }
          .gt { font-size: 2.8rem; }
          .gs { font-size: 0.72rem; }
          .cn { font-size: 1.05rem; }
          .cc { font-size: 0.68rem; }
          .cb { padding: 0.9rem 1.1rem; }
          .ds { max-width: 460px; margin-left: auto; margin-right: auto; }
          .sp { max-width: 460px; margin-left: auto; margin-right: auto; }
          .sc { align-items: center; }
          .din { font-size: 1.1rem; }
          .dic { font-size: 0.65rem; }
          .dih { font-size: 0.68rem; }
          .swc { width: 52px; height: 52px; }
          .swl { font-size: 0.7rem; max-width: 60px; }
          .sh { font-size: 0.65rem; }
        }
      `}</style>

      <div className="gr">
        <div className="gh">
          <div className="gt">Wedding Dress Code</div>
          <div className="go">✦ choose your look ✦</div>
          <div className="gs">Select your role · pick your color</div>
        </div>

        <div className="gl">
          <div className="cp">
            <div className="pl">Your Role</div>
            {categoryKeys.map((key) => {
              const c = categories[key];
              return (
                <button
                  key={key}
                  className={`cb ${selectedCategory === key ? "ca" : ""}`}
                  onClick={() => handleCategoryChange(key)}
                >
                  <span className="ci">{c.icon}</span>
                  <span>
                    <div className="cn">{key}</div>
                    <div className="cc">
                      {c.colors.length} color{c.colors.length > 1 ? "s" : ""}
                    </div>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="sc">
            <div className="ds" key={animKey}>
              <div className="dc tl" />
              <div className="dc tr" />
              <div className="dc bl" />
              <div className="dc br" />
              <div
                className="db fade-in"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <img className="di" src="/images/dress.webp" alt="Dress preview" />
              </div>
              <div className="dib">
                <span className="dic">{selectedCategory}</span>
                <span className="din">{selectedColor.name}</span>
                <span className="dih">{selectedColor.hex}</span>
              </div>
            </div>

            <div className="sp">
              <div className="sh">Color Palette</div>
              <div className="sw">
                {cat.colors.map((color) => (
                  <button
                    key={color.hex}
                    className={`swb ${selectedColor.hex === color.hex ? "sel" : ""}`}
                    onClick={() => handleColorChange(color)}
                    title={color.name}
                  >
                    <div
                      className="swc"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="swl">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
