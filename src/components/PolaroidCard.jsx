const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Jost:wght@300;400&display=swap');`;

export default function PolaroidCard({
  image,
  colors = [],
  selectedColor,
  onColorSelect,
  caption,

  // Polaroid
  rotation = 0,
  position = "",
  className = "",
  polaroidClassName = "",
  style = {},

  // Scrap
  scrapWidth = 120,
  scrapHeight = 60,
  scrapPosition = "bottom-right",
  scrapRotation = -12,
  scrapClassName = "",

  // Scrap Text
  scrapText = [],
  scrapTextMaxWidth = 120,
  scrapTextClassName = "",

  // Tape
  tapeText = "",
  tapeClassName = "",
}) {
  const scrapPositions = {
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",

    "outside-left": "-left-24 top-1/2 -translate-y-1/2",
    "outside-right": "-right-24 top-1/2 -translate-y-1/2",
    "outside-top": "-top-14 left-1/2 -translate-x-1/2",
    "outside-bottom": "-bottom-14 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`relative inline-block overflow-visible ${position} ${className}`}
    >
      <style>{FONT_IMPORT + `
        .washi-tape {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 20;
          white-space: nowrap;
          transform-origin: center center;
          padding: 7px 32px;
          font-family: 'Great Vibes', cursive;
          font-size: 1.4rem;
          letter-spacing: 0.04em;
          color: #fffdf8;
          text-shadow: 0 1px 3px rgba(80,20,25,0.35);
          /* layered background: noise SVG + burgundy tint */
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E"),
            linear-gradient(180deg, rgba(255,253,248,0.12) 0%, rgba(0,0,0,0.06) 100%);
          background-color: rgba(140, 60, 68, 0.82);
          background-blend-mode: overlay, normal;
          /* subtle torn-edge shadow */
          box-shadow:
            0 1px 0 rgba(255,253,248,0.18) inset,
            0 -1px 0 rgba(80,20,25,0.18) inset,
            0 3px 10px rgba(80,20,25,0.22),
            0 1px 2px rgba(80,20,25,0.14);
          /* faint edge lines like real tape */
          border-top: 1.5px solid rgba(255,220,220,0.22);
          border-bottom: 1.5px solid rgba(80,20,25,0.28);
        }
      `}</style>
      {/* ================= TAPE ================= */}
      {tapeText && (
        <div
          className={`washi-tape ${tapeClassName}`}
          style={{
            transform: `translateX(-50%) translateY(-50%) rotate(${rotation}deg)`,
          }}
        >
          {tapeText}
        </div>
      )}

      {/* ================= SCRAP ================= */}
      <div
        className={`
          absolute
          z-0
          pointer-events-none
          select-none
          ${scrapPositions[scrapPosition]}
          ${scrapClassName}
        `}
        style={{
          width: scrapWidth,
          height: scrapHeight,
          transform: `rotate(${scrapRotation}deg)`,
        }}
      >
        <img
          src="/images/scrap - Copy.png"
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
        />

        {scrapText?.length > 0 && (
          <ul
            className={`absolute inset-0 flex flex-col justify-center gap-1 px-5 ${scrapTextClassName}`}
            style={{
              transform: `rotate(${-scrapRotation}deg)`,
              maxWidth: scrapTextMaxWidth,
              margin: "0 auto",
            }}
          >
            {scrapText.map((item, index) => (
              <li
                key={index}
                style={{
                  listStyle: "none",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.05rem",
                  lineHeight: 1.5,
                  color: "#3a1a1e",
                  letterSpacing: "0.01em",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                }}
              >
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 300,
                  fontSize: "0.7rem",
                  color: "#722F37",
                  opacity: 0.7,
                  flexShrink: 0,
                }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= POLAROID ================= */}
      <div
        className={`
          relative
          z-10
          w-[350px]
          bg-white
          p-3
          pb-6
          shadow-xl
          ${polaroidClassName}
        `}
        style={{
          transform: `rotate(${rotation}deg)`,
          ...style,
        }}
      >
        {/* Photo */}
        <div
          className="aspect-[16/10] overflow-hidden"
          style={{ backgroundColor: selectedColor || "#f3f4f6", transition: "background-color 0.4s ease" }}
        >
          <img src={image} alt="" className="h-full w-full object-contain" />
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-col items-center gap-3">
          {caption && (
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: "#722F37",
              textAlign: "center",
            }}>{caption}</p>
          )}

          {colors.length > 0 && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              width: "100%",
            }}>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a08080",
              }}>pick a colour</span>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => onColorSelect?.(color)}
                    title={color}
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: selectedColor === color
                        ? "2px solid #722F37"
                        : "2px solid rgba(0,0,0,0.1)",
                      boxShadow: selectedColor === color
                        ? "0 0 0 2px rgba(255,253,248,1), 0 0 0 4px #722F37"
                        : "0 1px 3px rgba(0,0,0,0.15)",
                      transform: selectedColor === color ? "scale(1.18)" : "scale(1)",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
