import { useState, useRef } from "react";

export default function BookHalfSlider() {
  const [progress, setProgress] = useState(0); // 0 or 1
  const startX = useRef(null);
  const isDragging = useRef(false);

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;

    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX.current;

    // threshold before switching page
    if (diff > 50) {
      setProgress(0); // left page
    } else if (diff < -50) {
      setProgress(1); // right page
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    startX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* VIEWPORT */}
      <div
        className="w-[300px] overflow-hidden rounded-lg shadow-lg cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <img
          src="/images/notebook.png"
          alt="Open Book"
          className="w-[200%] max-w-none transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${progress * 50}%)`,
          }}
        />
      </div>

      {/* DOTS */}
      <div className="flex items-center gap-3">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setProgress(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              progress === i
                ? "bg-black scale-125"
                : "bg-gray-300 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
