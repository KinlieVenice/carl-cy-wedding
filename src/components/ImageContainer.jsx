function ImageContainer ({children, rotation = 0, height = 200, className}) {

    return (
      <div
        className={`${className} w-auto`}
        style={{
          height: `${height}px`,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {children}
      </div>
    );
}

export default ImageContainer;