import { useState } from "react";

// Define your images here
const IMAGES = [
  "/ourstory/1.webp",
  "/ourstory/2.webp",
  "/ourstory/3.webp",
  "/ourstory/4.webp",
  "/ourstory/5.webp",
  "/ourstory/6.webp",
  "/ourstory/7.webp",
  "/ourstory/8.webp",
  "/ourstory/9.webp",
  "/ourstory/10.webp",
  "/ourstory/11.webp",
  "/ourstory/12.webp",
  "/ourstory/13.webp",
  "/ourstory/14.webp",
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

  const goNext = () => {
    if (dealing || returning) return;
    if (isLast) {
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

  const goPrev = () => {
    if (dealing || returning || current === 0) return;
    setCurrent((c) => c - 1);
  };

  return (
    <>
      <style>{`
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
              onClick={isTop ? goNext : undefined}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }}
                loading={i === 0 ? "eager" : "lazy"}
                fetchpriority={i === 0 ? "high" : "auto"}
              />
              {/* prev / next arrows */}
              {isTop && !dealing && !returning && (
                <div style={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}>
                  {/* prev */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    disabled={current === 0}
                    style={{
                      background: "rgba(0,0,0,0.38)",
                      border: "none",
                      color: current === 0 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.92)",
                      fontSize: 22,
                      cursor: current === 0 ? "default" : "pointer",
                      borderRadius: "50%",
                      width: 36, height: 36,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      lineHeight: 1,
                    }}
                  >‹</button>
                  {/* counter */}
                  <span style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.85)",
                    background: "rgba(0,0,0,0.38)",
                    padding: "4px 10px",
                    borderRadius: 20,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>{current + 1} / {total}</span>
                  {/* next */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    style={{
                      background: "rgba(0,0,0,0.38)",
                      border: "none",
                      color: "rgba(255,255,255,0.92)",
                      fontSize: 22,
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: 36, height: 36,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      lineHeight: 1,
                    }}
                  >{isLast ? "↺" : "›"}</button>
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
