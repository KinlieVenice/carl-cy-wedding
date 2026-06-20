/**
 * FlowerDecoration — absolutely-positioned decorative image.
 *
 * Usage (parent must have position: relative):
 *
 *   <div className="relative">
 *     <FlowerDecoration
 *       src="/images/flower1.png"
 *       top="-30px" right="-15px"
 *       rotate={30} size="100px"
 *     />
 *     <FlowerDecoration
 *       src="/images/flower2.png"
 *       bottom="10px" left="-20px"
 *       rotate={-15} size="80px" flip
 *     />
 *     ... section content ...
 *   </div>
 *
 * Props:
 *   src          — image path, e.g. "/images/flower1.png"
 *   top/bottom/left/right — CSS values, e.g. "-20px", "5%"
 *   rotate       — degrees (default 0)
 *   size         — width; height is auto (default "80px")
 *   opacity      — 0–1 (default 1)
 *   flip         — mirror horizontally with scaleX(-1) (default false)
 *   zIndex       — stacking order (default 0); use -1 to tuck behind content
 */
export default function FlowerDecoration({
  src,
  top,
  bottom,
  left,
  right,
  rotate = 0,
  size = "80px",
  opacity = 1,
  flip = false,
  zIndex = 0,
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        width: size,
        height: "auto",
        opacity,
        zIndex,
        transform: `rotate(${rotate}deg)${flip ? " scaleX(-1)" : ""}`,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}
