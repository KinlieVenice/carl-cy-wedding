import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const spreads = [
  "/images/notebook-1.png", // left + right page together
  "/images/notebook-2.png",
];

export default function NotebookCarousel() {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      spaceBetween={0}
      pagination={{ clickable: true }}
      className="w-[85%] max-w-5xl mx-auto"
    >
      {spreads.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-[55dvh] flex items-center justify-center">
            <img
              src={img}
              className="w-full h-full object-contain"
              alt={`Spread ${i + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
