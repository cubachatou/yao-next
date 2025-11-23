'use client';

import { slides } from './config';

interface SliderOverlayProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  progress: number;
}

export function SliderOverlay({ currentSlide, totalSlides, onNavigate, progress }: SliderOverlayProps) {
  return (
    <>
      <span className="slide-number absolute top-1/2 left-8 -translate-y-1/2 text-xs font-semibold text-white z-10 tracking-[1px] uppercase">
        {String(currentSlide + 1).padStart(2, '0')}
      </span>

      <span className="slide-total absolute top-1/2 right-8 -translate-y-1/2 text-xs font-semibold text-white z-10 tracking-[1px] uppercase">
        {String(totalSlides).padStart(2, '0')}
      </span>

      <nav className="slides-navigation absolute bottom-8 left-8 right-8 flex gap-0 z-10 pointer-events-auto">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide-nav-item flex flex-col cursor-pointer p-4 flex-1 border-none bg-none ${
              index === currentSlide ? 'active' : ''
            }`}
            onClick={e => {
              e.stopPropagation();
              onNavigate(index);
            }}
          >
            <div className="slide-progress-line w-full h-0.5 bg-white/20 mb-2 rounded-[1px] overflow-hidden">
              <div
                className={`slide-progress-fill h-full bg-white transition-[width,opacity] duration-100 ease-out rounded-[1px] ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  width: index === currentSlide ? `${progress}%` : '0%',
                }}
              ></div>
            </div>
            <div
              className={`slide-nav-title text-[11px] uppercase tracking-[0.5px] font-semibold transition-colors duration-300 ease-out ${
                index === currentSlide ? 'text-white' : 'text-white/80'
              }`}
            >
              {slide.title}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}
