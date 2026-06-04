import { useState } from "react";

const colorNames = {
  "#D7C4A6": "Champagne",
  "#B99A74": "Taupe",
  "#F1E7D7": "Ivory",
  "#E6C2C0": "Dusty Rose",
  "#D8A7A3": "Blush",
  "#F2D9D7": "Soft Pink",
  "#CBB59B": "Sand",
  "#E8DACA": "Beige",
  "#B49A80": "Mocha",
  "#D8C6B0": "Nude",
  "#E7DCCF": "Cream",
  "#BBA48A": "Tan",
};

const getColorName = (hex) => colorNames[hex] || "Color";

const photos = [
  {
    src: "/images/photo1.jpg",
    label: "Parents of Bride & Groom",
    colors: ["#D7C4A6", "#B99A74", "#F1E7D7"],
  },
  {
    src: "/images/photo2.jpg",
    label: "Bridesmaids",
    colors: ["#E6C2C0", "#D8A7A3", "#F2D9D7"],
  },
  {
    src: "/images/photo3.jpg",
    label: "Principal Sponsors",
    colors: ["#CBB59B", "#E8DACA", "#B49A80"],
  },
  {
    src: "/images/photo4.jpg",
    label: "Guests",
    colors: ["#D8C6B0", "#E7DCCF", "#BBA48A"],
  },
];

export default function PolaroidSlider() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + photos.length) % photos.length);

  const next = () => setActive((p) => (p + 1) % photos.length);

  return (
    <div className="w-full flex justify-center">
      {/* POLAROID FRAME */}
      <div className="relative w-[420px] h-[500px] flex items-center justify-center overflow-hidden">
        {/* STACK */}
        {photos.map((item, index) => {
          const offset = index - active;

          return (
            <div
              key={index}
              onClick={() => setActive(index)}
              className="absolute w-[300px] h-[420px] bg-white shadow-2xl p-4 cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: `
                  translateX(${offset * 30}px)
                  translateY(${Math.abs(offset) * 10}px)
                  rotate(${offset * 5}deg)
                  scale(${index === active ? 1 : 0.92})
                `,
                zIndex: 100 - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
            >
              {/* IMAGE */}
              <div className="w-full h-[65%] overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              {/* LABEL */}
              <div className="mt-3 text-center font-semibold text-gray-800 text-sm">
                {item.label}
              </div>

              {/* COLORS */}
              <div className="mt-4 flex justify-center gap-4 flex-wrap">
                {item.colors.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-10 rounded-md shadow-md border border-gray-300"
                      style={{ backgroundColor: c }}
                    />
                    <div className="text-[11px] font-medium text-gray-700">
                      {getColorName(c)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* 🔥 ARROWS INSIDE POLAROID AREA (OVERLAY) */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2
                     z-[9999] text-4xl bg-white/90 shadow-lg
                     rounded-full px-2 hover:bg-white transition"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2
                     z-[9999] text-4xl bg-white/90 shadow-lg
                     rounded-full px-2 hover:bg-white transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
