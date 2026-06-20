import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookHalfSlider() {
  const [progress, setProgress] = useState(0); // 0 = left page, 1 = right page
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

    if (diff > 50) {
      setProgress(0);
    } else if (diff < -50) {
      setProgress(1);
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    startX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* BOOK + ARROWS */}
      <div className="flex items-center gap-1">
        {/* LEFT ARROW */}
        <button
          onClick={() => setProgress(0)}
          disabled={progress === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <ChevronLeft size={24} />
        </button>

        {/* BOOK VIEWPORT */}
        <div
          className="w-[300px] overflow-hidden rounded-lg shadow-lg cursor-grab active:cursor-grabbing select-none"
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
            draggable={false}
            className="w-[200%] max-w-none transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${progress * 50}%)`,
            }}
          />
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => setProgress(1)}
          disabled={progress === 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex items-center gap-2">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setProgress(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              progress === i
                ? "bg-black scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
