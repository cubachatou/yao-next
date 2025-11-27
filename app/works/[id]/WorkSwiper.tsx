'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Link from 'next/link';
import type { SanityImage } from '@/types';

interface WorkSwiperProps {
  images: SanityImage[];
  workTitle: string;
}

export default function WorkSwiper({ images, workTitle }: WorkSwiperProps) {
  const mainSwiperRef = useRef<SwiperRef | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '[data-project-main-swiper]',
      children: 'a',
      pswpModule: PhotoSwipe,
      bgOpacity: 1,
      allowPanToNext: false,
      loop: false,
      counter: false,
      zoom: false,
      wheelToZoom: true,
      closeOnVerticalDrag: true,
      arrowPrevSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-arrow-left-icon lucide-arrow-left ml-auto">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>`,
      arrowNextSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-arrow-right-icon lucide-arrow-right">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>`,
      closeSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-x-icon lucide-x">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>`,
    });

    lightbox.on('change', () => {
      const { pswp } = lightbox;
      if (pswp?.currSlide && mainSwiperRef.current?.swiper) {
        mainSwiperRef.current.swiper.slideTo(pswp.currSlide.index, 0);

        if (thumbsSwiper) {
          thumbsSwiper.slideTo(pswp.currSlide.index, 0);
        }
      }
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [thumbsSwiper]);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-8 h-full" data-project-main-swiper>
      <Swiper
        ref={mainSwiperRef}
        modules={[EffectFade, Navigation, Thumbs]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={false}
        spaceBetween={10}
        navigation={{
          nextEl: '[data-swipe-right]',
          prevEl: '[data-swipe-left]',
        }}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex! items-center justify-center">
            <button data-swipe-left className="grow h-full"></button>

            <Link
              href={image.url}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              target="_blank"
              className="shrink-0 h-full flex items-center justify-center"
            >
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt || `${workTitle} - Image ${index + 1}`}
                className="h-full w-auto object-contain max-w-screen"
                priority={index === 0}
              />
            </Link>

            <button data-swipe-right className="grow h-full"></button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-center min-w-0">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          spaceBetween={8}
          className="px-4!"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="basis-14 aspect-16/13 cursor-pointer mr-2 before:absolute before:inset-0 before:bg-white/60"
              onMouseOver={() => mainSwiperRef.current?.swiper.slideTo(index)}
            >
              <Image
                src={image.url}
                width={60}
                height={60}
                alt={image.alt || `${workTitle} - Thumbnail ${index + 1}`}
                className="size-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
