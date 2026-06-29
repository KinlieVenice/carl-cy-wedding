import { useEffect, useState } from "react";

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

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setBp(w >= 1024 ? "lg" : w >= 768 ? "md" : "sm");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const r = (lg, md, sm) => bp === "lg" ? (lg ?? md ?? sm) : bp === "md" ? (md ?? sm) : sm;

  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
      style={{
        position,
        top: r(lgTop, mdTop, top),
        bottom: r(lgBottom, mdBottom, bottom),
        left: r(lgLeft, mdLeft, left),
        right: r(lgRight, mdRight, right),
        width: r(lgWidth, mdWidth, width),
        height: "auto",
        zIndex: r(lgZIndex, mdZIndex, zIndex),
        opacity,
        transform: `rotate(${r(lgRotate, mdRotate, rotate)}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
        transformOrigin: "center center",
        ...style,
      }}
    />
  );
}
