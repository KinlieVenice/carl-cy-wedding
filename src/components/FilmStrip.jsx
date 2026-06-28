import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const frames = [
  "/prenup/DSCF2731.webp",
  "/prenup/DSCF2777.webp",
  "/prenup/DSCF2778.webp",
  "/prenup/DSCF2779.webp",
  "/prenup/DSCF3119.webp",
  "/prenup/DSCF3129.webp",
  "/prenup/DSCF3551.webp",
  "/prenup/DSCF3575.webp",
  "/prenup/DSCF3581.webp",
  "/prenup/DSCF3593.webp",
  "/prenup/DSCF3601.webp",
  "/prenup/DSCF3616.webp",
  "/prenup/DSCF3620.webp",
  "/prenup/DSCF3624.webp",
  "/prenup/DSCF3639.webp",
  "/prenup/DSCF3645.webp",
  "/prenup/DSCF3653.webp",
  "/prenup/DSCF3711.webp",
  "/prenup/DSCF3727.webp",
  "/prenup/DSCF3733-2.webp",
  "/prenup/DSCF3733.webp",
  "/prenup/DSCF3745.webp",
  "/prenup/DSCF3746.webp",
  "/prenup/DSCF3750.webp",
  "/prenup/DSCF3761.webp",
  "/prenup/DSCF4082.webp",
  "/prenup/DSCF4090.webp",
  "/prenup/DSCF4098.webp",
  "/prenup/DSCF4124.webp",
  "/prenup/DSCF4154.webp",
  "/prenup/DSCF4159.webp",
  "/prenup/DSCF4183.webp",
  "/prenup/DSCF4211.webp",
  "/prenup/DSCF4217.webp",
  "/prenup/DSCF4221.webp",
  "/prenup/fxn 2026-04-11 14123608D80A4DFFD1.webp",
  "/prenup/fxn 2026-04-11 141349174BA0C2697B.webp",
  "/prenup/fxn 2026-04-12 170919368EB59B790D.webp",
  "/prenup/fxn 2026-04-12 17124208A257BF1D04.webp",
  "/prenup/fxn 2026-04-12 171403786937211516.webp",
  "/prenup/fxn 2026-04-12 1714060C93A6CBAC9A.webp",
  "/prenup/fxn 2026-04-12 171416067A47A8CE10.webp",
  "/prenup/fxn 2026-04-12 171812DCAC537FA19E.webp",
  "/prenup/fxn 2026-04-12 1719112CB3BD337D23.webp",
  "/prenup/fxn 2026-04-12 171913AEB64F880EB2.webp",
  "/prenup/fxn 2026-04-12 1719154991435A6F92.webp",
];

export default function FilmStrip() {
  const [lightbox, setLightbox] = useState(null); // index or null

  const prev = () => setLightbox((i) => (i - 1 + frames.length) % frames.length);
  const next = () => setLightbox((i) => (i + 1) % frames.length);

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <>
      <div className="w-full overflow-hidden flex justify-center z-20">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={"auto"}
          spaceBetween={0}
          loop={true}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={true}
          className="px-4"
        >
          {frames.map((src, i) => (
            <SwiperSlide key={i} className="w-auto!">
              <div
                className="flex items-center bg-black px-2 py-3 cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <div className="flex flex-col justify-between py-2 mr-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-white rounded-sm opacity-80" />
                  ))}
                </div>
                <div className="w-44 h-44 overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-col justify-between py-2 ml-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-white rounded-sm opacity-80" />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: 16, right: 20,
              background: "none", border: "none",
              color: "#fff", fontSize: 32, cursor: "pointer", lineHeight: 1,
            }}
          >×</button>

          {/* counter */}
          <div style={{
            position: "absolute", top: 18, left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: "0.1em",
          }}>
            {lightbox + 1} / {frames.length}
          </div>

          {/* prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute", left: 16,
              background: "rgba(255,255,255,0.12)", border: "none",
              color: "#fff", fontSize: 28, cursor: "pointer",
              borderRadius: "50%", width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >‹</button>

          {/* image */}
          <img
            src={frames[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw", maxHeight: "88vh",
              objectFit: "contain", borderRadius: 4,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          />

          {/* next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute", right: 16,
              background: "rgba(255,255,255,0.12)", border: "none",
              color: "#fff", fontSize: 28, cursor: "pointer",
              borderRadius: "50%", width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >›</button>
        </div>
      )}
    </>
  );
}
