import { useEffect, useRef, useState } from "react";

const style$ = `
@keyframes sticker-pop {
  0%   { opacity: 0; transform: scale(0.7); }
  70%  { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
.sticker-pop {
  animation: sticker-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
}
.sticker-hidden { opacity: 0; }
`;

export default function Sticker({
  src,
  width = 80, mdWidth, lgWidth,
  top, mdTop, lgTop,
  bottom, mdBottom, lgBottom,
  left, mdLeft, lgLeft,
  right, mdRight, lgRight,
  rotate = 0, mdRotate, lgRotate,
  zIndex = 10, mdZIndex, lgZIndex,
  opacity = 1,
  flipX = false,
  flipY = false,
  position = "absolute",
  className = "",
  style = {},
}) {
  const [bp, setBp] = useState("sm");
  const [visible, setVisible] = useState(false);
  const spanRef = useRef(null);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setBp(w >= 1024 ? "lg" : w >= 768 ? "md" : "sm");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const r = (lg, md, sm) => bp === "lg" ? (lg ?? md ?? sm) : bp === "md" ? (md ?? sm) : sm;

  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return (
    <>
      <style>{style$}</style>
      <span
        ref={spanRef}
        style={{
          position,
          top: r(lgTop, mdTop, top),
          bottom: r(lgBottom, mdBottom, bottom),
          left: r(lgLeft, mdLeft, left),
          right: r(lgRight, mdRight, right),
          zIndex: r(lgZIndex, mdZIndex, zIndex),
          display: "block",
          width: r(lgWidth, mdWidth, width),
          height: "auto",
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className={`${visible ? "sticker-pop" : "sticker-hidden"} pointer-events-none select-none ${className}`}
          style={{
            width: "100%",
            height: "auto",
            opacity,
            transform: `rotate(${r(lgRotate, mdRotate, rotate)}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
            transformOrigin: "center center",
            ...style,
          }}
        />
      </span>
    </>
  );
}
