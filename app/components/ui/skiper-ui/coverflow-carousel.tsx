"use client";

/**
 * Adapted from Skiper UI "skiper49" (Carousel_003), https://skiper-ui.com, by @gurvinder-singh02.
 * Built with Swiper.js (coverflow effect). Changed for this site: slides take any content
 * instead of a single image, sizes follow the viewport, bullets use the brand colour and
 * the arrows are the site's own buttons.
 */
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

const css = `
  .Carousel_003 {
    width: 100%;
    padding-bottom: 4.5rem !important;
  }
  .Carousel_003 .swiper-slide {
    width: min(84vw, 60rem);
    height: min(68svh, 36rem);
    border-radius: 2rem;
    overflow: hidden;
  }
  .Carousel_003 .swiper-pagination {
    bottom: 1.1rem !important;
  }
  .Carousel_003 .swiper-pagination-bullet {
    background-color: rgb(var(--foreground)) !important;
    opacity: 0.25;
    transition: width 0.3s, opacity 0.3s;
  }
  .Carousel_003 .swiper-pagination-bullet-active {
    background-color: rgb(var(--brand)) !important;
    opacity: 1;
    width: 1.5rem;
    border-radius: 999px;
  }
`;

export function CoverflowCarousel({
  items,
  className,
  prevLabel,
  nextLabel,
}: {
  items: { id: string; content: React.ReactNode }[];
  className?: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const swiper = useRef<SwiperInstance | null>(null);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <style>{css}</style>
      <Swiper
        onSwiper={(instance) => (swiper.current = instance)}
        effect="coverflow"
        grabCursor
        centeredSlides
        slideToClickedSlide
        slidesPerView="auto"
        loop={items.length > 3}
        keyboard={{ enabled: true, onlyInViewport: true }}
        coverflowEffect={{ rotate: 32, stretch: 0, depth: 140, modifier: 1, slideShadows: true }}
        pagination={{ clickable: true }}
        className="Carousel_003"
        modules={[EffectCoverflow, Pagination, Keyboard, A11y]}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>{item.content}</SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="container mx-auto flex justify-between px-6 lg:px-8">
          <Button
            variant="outline"
            size="icon"
            aria-label={prevLabel}
            onClick={() => swiper.current?.slidePrev()}
            className="pointer-events-auto size-12 rounded-full"
          >
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={nextLabel}
            onClick={() => swiper.current?.slideNext()}
            className="pointer-events-auto size-12 rounded-full"
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
