'use client';

import { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preloader } from './Preloader';
import { SliderContent } from './SliderContent';
import { SliderOverlay } from './SliderOverlay';
import { slides, SLIDER_CONFIG } from './config';

export function Slider() {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const handleTransitionComplete = useCallback(() => {
        setIsTransitioning(false);
        setProgress(0);
        setAutoPlay(true);
    }, []);

    const navigateToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentSlide) return;
        setCurrentSlide(index);
        setIsTransitioning(true);
        setProgress(0);
        setAutoPlay(false); // Pause autoplay during manual navigation
    }, [isTransitioning, currentSlide]);

    const nextSlide = useCallback(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        navigateToSlide(nextIndex);
    }, [currentSlide, navigateToSlide]);

    const prevSlide = useCallback(() => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        navigateToSlide(prevIndex);
    }, [currentSlide, navigateToSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            } else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Autoplay
    useEffect(() => {
        if (!loaded || !autoPlay || isTransitioning) return;

        const duration = SLIDER_CONFIG.settings.autoSlideSpeed;
        const interval = 50;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    nextSlide();
                    return 0;
                }
                return prev + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [loaded, autoPlay, isTransitioning, nextSlide]);

    return (
        <div className="slider-wrapper absolute top-0 left-0 w-screen h-svh overflow-hidden bg-black">
            {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

            <div
                className={`w-full h-full transition-opacity duration-1500 ease-in ${
                    loaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Canvas
                    orthographic
                    camera={{ zoom: 1, position: [0, 0, 1] }}
                    className="w-full h-full block"
                    gl={{ antialias: false, alpha: false }}
                    dpr={[1, 2]}
                >
                    <SliderContent
                        currentSlide={currentSlide}
                        isTransitioning={isTransitioning}
                        onTransitionComplete={handleTransitionComplete}
                    />
                </Canvas>

                <SliderOverlay
                    currentSlide={currentSlide}
                    totalSlides={slides.length}
                    onNavigate={navigateToSlide}
                    progress={progress}
                />
            </div>
        </div>
    );
}
