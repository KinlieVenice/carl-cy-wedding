import { useState } from "react";

const photos = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
];

export default function PolaroidSlider() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % photos.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Slider */}
      <div className="relative w-[320px] h-[420px]">
        {photos.map((src, index) => {
          const offset = index - active;

          return (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`absolute left-1/2 top-1/2 w-[260px] h-[340px]
              -translate-x-1/2 -translate-y-1/2
              bg-white shadow-xl p-3 cursor-pointer
              transition-all duration-500 ease-out
              hover:scale-105`}
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 40}px)
                  translateY(${Math.abs(offset) * 10}px)
                  rotate(${offset * 6}deg)
                  scale(${index === active ? 1 : 0.92})
                `,
                zIndex: photos.length - Math.abs(offset),
              }}
            >
              <div className="w-full h-[85%] overflow-hidden bg-gray-100">
                <img src={src} className="w-full h-full object-cover" alt="" />
              </div>

              <div className="h-[15%] flex items-center justify-center text-sm font-medium text-gray-700">
                Memory {index + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={prev}
          className="px-4 py-2 bg-black text-white rounded-full"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="px-4 py-2 bg-black text-white rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}
