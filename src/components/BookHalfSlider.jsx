import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookHalfSlider() {
  const books = [
    "/images/notebook.webp",
    "/images/notebook2.webp",
    "/images/notebook3.webp",
  ];

  // 0 = notebook1 left
  // 1 = notebook1 right
  // 2 = notebook2 left
  // 3 = notebook2 right
  // etc.
  const totalSlides = books.length * 2;

  const [slide, setSlide] = useState(0);

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

    if (diff > 50 && slide > 0) {
      setSlide((prev) => prev - 1);
      isDragging.current = false;
    }

    if (diff < -50 && slide < totalSlides - 1) {
      setSlide((prev) => prev + 1);
      isDragging.current = false;
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    startX.current = null;
  };

  // Which notebook image are we showing?
  const currentBook = Math.floor(slide / 2);

  // 0 = left half, 1 = right half
  const currentSide = slide % 2;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1">
        {/* LEFT */}
        <button
          onClick={() => setSlide((prev) => prev - 1)}
          disabled={slide === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
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
            src={books[currentBook]}
            alt="Open Book"
            draggable={false}
            className="w-[200%] max-w-none transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSide * 50}%)`,
            }}
          />
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setSlide((prev) => prev + 1)}
          disabled={slide === totalSlides - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              slide === i
                ? "bg-black scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
