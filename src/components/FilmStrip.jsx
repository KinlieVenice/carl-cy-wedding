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
  return (
    <div className="w-full overflow-hidden flex justify-center z-20">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={0}
        loop={true}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        className="px-4"
      >
        {frames.map((src, i) => (
          <SwiperSlide key={i} className="w-auto!">
            <div className="flex items-center bg-black px-2 py-3">
              {/* left holes */}
              <div className="flex flex-col justify-between py-2 mr-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 bg-white rounded-sm opacity-80"
                  />
                ))}
              </div>

              {/* image */}
              <div className="w-44 h-44 overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>

              {/* right holes */}
              <div className="flex flex-col justify-between py-2 ml-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 bg-white rounded-sm opacity-80"
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
