export default function Sticker({
  src,
  width = 80,
  top,
  bottom,
  left,
  right,
  rotate = 0,
  zIndex = 10,
  opacity = 1,
  flipX = false,
  flipY = false,
  position = "absolute",
  className = "",
  style = {},
}) {
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
        top,
        bottom,
        left,
        right,
        width,
        height: "auto",
        zIndex,
        opacity,
        transform: `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
        transformOrigin: "center center",
        ...style,
      }}
    />
  );
}
