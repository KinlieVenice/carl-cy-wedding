import { useState, useEffect } from "react";

// Define your images here
const IMAGES = [
  "/images/story1.webp",
  "/images/story2.webp",
  "/images/story3.webp",
  "/images/story4.webp",
  "/images/story5.webp",
  "/images/story6.webp",
  "/images/story7.webp",
  "/images/story8.webp",
  "/images/story9.webp",
  "/images/story10.webp",
  "/images/story11.webp",
  "/images/story12.webp",
  "/images/story13.webp",
  "/images/story14.webp",
];

const W = 340;
const DEAL_MS = 420;
const RETURN_INTERVAL = 90;

export default function PagePeelStack() {
  const [current, setCurrent] = useState(0);
  const [dealing, setDealing] = useState(false);
  const [returning, setReturning] = useState(false);
  const total = IMAGES.length;
  const isLast = current === total - 1;
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    setHintVisible(true);
    if (current === 0) return;
    const t = setTimeout(() => setHintVisible(false), 7000);
    return () => clearTimeout(t);
  }, [current]);

  const deal = () => {
    if (dealing || returning) return;
    if (isLast) {
      // fly all back to deck
      setReturning(true);
      setCurrent(0);
      const totalDuration = DEAL_MS + (total - 1) * RETURN_INTERVAL;
      setTimeout(() => setReturning(false), totalDuration);
    } else {
      setDealing(true);
      setTimeout(() => {
        setCurrent((c) => c + 1);
        setDealing(false);
      }, DEAL_MS);
    }
  };

  return (
    <>
      <style>{`
        @keyframes hintBreathe {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50%       { transform: translateX(-50%) scale(1.13); }
        }
        @keyframes cardDeal {
          0%   { transform: translateX(0)     rotate(0deg);   opacity: 1; }
          25%  { transform: translateX(20%)   rotate(6deg);   opacity: 1; }
          100% { transform: translateX(130%)  rotate(20deg);  opacity: 0; }
        }
        @keyframes cardFlyBack {
          0%   { transform: translateX(130%)  rotate(20deg);  opacity: 0; }
          55%  { transform: translateX(-4%)   rotate(-2deg);  opacity: 1; }
          100% { transform: translateX(0)     rotate(0deg);   opacity: 1; }
        }
      `}</style>

      <div style={{ position: "relative", width: W, aspectRatio: "3/4" }}>
        {IMAGES.map((src, i) => {
          const depth = i - current;
          if (depth < 0) return null;
          const isTop = depth === 0;
          const stackShift = Math.min(depth, 3);

          let animation = "none";
          if (isTop && dealing) {
            animation = `cardDeal ${DEAL_MS}ms cubic-bezier(0.4,0,1,0.8) forwards`;
          }
          if (returning) {
            // deeper cards fly back first (delay=0), top card last
            const delay = (total - 1 - depth) * RETURN_INTERVAL;
            animation = `cardFlyBack ${DEAL_MS}ms cubic-bezier(0.2,0,0.4,1) ${delay}ms both`;
          }

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: W,
                height: "100%",
                top: stackShift * 3,
                left: stackShift * 3,
                zIndex: total - depth,
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
                animation,
                cursor: isTop ? "pointer" : "default",
              }}
              onClick={isTop ? deal : undefined}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }}
                loading={i === 0 ? "eager" : "lazy"}
                fetchpriority={i === 0 ? "high" : "auto"}
              />
              {/* tap hint */}
              {isTop && !dealing && !returning && hintVisible && (
                <div style={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 11,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.92)",
                  background: "rgba(0,0,0,0.38)",
                  padding: "4px 12px",
                  borderRadius: 20,
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.05em",
                  animation: "hintBreathe 2.2s ease-in-out infinite",
                }}>
                  {isLast ? "tap to restart" : "tap anywhere to flip"}
                </div>
              )}
            </div>
          );
        })}

        {/* dots */}
        <div style={{
          position: "absolute",
          bottom: -30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}>
          {IMAGES.map((_, i) => (
            <div key={i} style={{
              width: i === current ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: i === current ? "#722F37" : "#ccc",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </>
  );
}
