import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const frames = [
  "/images/groom-carl.webp",
  "/images/bride-cy.webp",
  "/images/groom-carl.webp",
  "/images/bride-cy.webp",
  "/images/groom-carl.webp",
  "/images/bride-cy.webp",
  "/images/groom-carl.webp",
  "/images/bride-cy.webp",
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
