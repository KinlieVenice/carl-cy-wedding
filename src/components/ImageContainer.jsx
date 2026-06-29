import { useEffect, useState } from "react";

function ImageContainer({ children, rotation = 0, mdRotation, lgRotation, height, mdHeight, lgHeight, className }) {
  const [resolvedHeight, setResolvedHeight] = useState(height);
  const [resolvedRotation, setResolvedRotation] = useState(rotation);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) {
        setResolvedHeight(lgHeight ?? mdHeight ?? height);
        setResolvedRotation(lgRotation ?? mdRotation ?? rotation);
      } else if (w >= 768) {
        setResolvedHeight(mdHeight ?? height);
        setResolvedRotation(mdRotation ?? rotation);
      } else {
        setResolvedHeight(height);
        setResolvedRotation(rotation);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height, mdHeight, lgHeight, rotation, mdRotation, lgRotation]);

  return (
    <div
      className={`${className ?? ""} w-full flex justify-center`}
      style={{
        height: resolvedHeight ? `${resolvedHeight}px` : undefined,
        transform: `rotate(${resolvedRotation}deg)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </div>
  );
}

export default ImageContainer;
