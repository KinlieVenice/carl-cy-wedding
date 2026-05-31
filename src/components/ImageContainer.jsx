function ImageContainer({ children, rotation = 0, height, className }) {
  return (
    <div
      className={`${className ?? ""} w-full flex justify-center`}
      style={{
        height: `${height}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </div>
  );
}

export default ImageContainer;
