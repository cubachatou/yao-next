'use client';

import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';
import { SLIDER_CONFIG, slides } from './config';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import gsap from 'gsap';

interface SliderContentProps {
    currentSlide: number;
    isTransitioning: boolean;
    onTransitionComplete: () => void;
}

export function SliderContent({ currentSlide, isTransitioning, onTransitionComplete }: SliderContentProps) {
    const { viewport, size } = useThree();
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [textures, setTextures] = useState<THREE.Texture[]>([]);

    // Load textures manually to handle errors and ensure all are loaded
    useEffect(() => {
        const loadTextures = async () => {
            const loadedTextures = await Promise.all(
                slides.map(async (slide) => {
                    try {
                        const loader = new THREE.TextureLoader();
                        return await new Promise<THREE.Texture>((resolve, reject) => {
                            loader.load(
                                slide.media,
                                (tex) => {
                                    tex.minFilter = THREE.LinearFilter;
                                    tex.magFilter = THREE.LinearFilter;
                                    tex.userData = { size: new THREE.Vector2(tex.image.width, tex.image.height) };
                                    resolve(tex);
                                },
                                undefined,
                                reject
                            );
                        });
                    } catch (e) {
                        console.error('Failed to load texture', slide.media, e);
                        return new THREE.Texture();
                    }
                })
            );
            setTextures(loadedTextures);
        };
        loadTextures();
    }, []);


    // Uniforms
    const uniforms = useMemo(() => ({
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
        uEffectType: {
            value: {
                glass: 0,
                frost: 1,
                ripple: 2,
                plasma: 3,
                timeshift: 4
            }[SLIDER_CONFIG.settings.currentEffect as keyof typeof SLIDER_CONFIG.effectPresets] || 0
        },
        // Initialize all other uniforms from config
        uGlobalIntensity: { value: SLIDER_CONFIG.settings.globalIntensity },
        uSpeedMultiplier: { value: SLIDER_CONFIG.settings.speedMultiplier },
        uDistortionStrength: { value: SLIDER_CONFIG.settings.distortionStrength },
        uColorEnhancement: { value: SLIDER_CONFIG.settings.colorEnhancement },
        uGlassRefractionStrength: { value: SLIDER_CONFIG.settings.glassRefractionStrength },
        uGlassChromaticAberration: { value: SLIDER_CONFIG.settings.glassChromaticAberration },
        uGlassBubbleClarity: { value: SLIDER_CONFIG.settings.glassBubbleClarity },
        uGlassEdgeGlow: { value: SLIDER_CONFIG.settings.glassEdgeGlow },
        uGlassLiquidFlow: { value: SLIDER_CONFIG.settings.glassLiquidFlow },
        uFrostIntensity: { value: SLIDER_CONFIG.settings.frostIntensity },
        uFrostCrystalSize: { value: SLIDER_CONFIG.settings.frostCrystalSize },
        uFrostIceCoverage: { value: SLIDER_CONFIG.settings.frostIceCoverage },
        uFrostTemperature: { value: SLIDER_CONFIG.settings.frostTemperature },
        uFrostTexture: { value: SLIDER_CONFIG.settings.frostTexture },
        uRippleFrequency: { value: SLIDER_CONFIG.settings.rippleFrequency },
        uRippleAmplitude: { value: SLIDER_CONFIG.settings.rippleAmplitude },
        uRippleWaveSpeed: { value: SLIDER_CONFIG.settings.rippleWaveSpeed },
        uRippleRippleCount: { value: SLIDER_CONFIG.settings.rippleRippleCount },
        uRippleDecay: { value: SLIDER_CONFIG.settings.rippleDecay },
        uPlasmaIntensity: { value: SLIDER_CONFIG.settings.plasmaIntensity },
        uPlasmaSpeed: { value: SLIDER_CONFIG.settings.plasmaSpeed },
        uPlasmaEnergyIntensity: { value: SLIDER_CONFIG.settings.plasmaEnergyIntensity },
        uPlasmaContrastBoost: { value: SLIDER_CONFIG.settings.plasmaContrastBoost },
        uPlasmaTurbulence: { value: SLIDER_CONFIG.settings.plasmaTurbulence },
        uTimeshiftDistortion: { value: SLIDER_CONFIG.settings.timeshiftDistortion },
        uTimeshiftBlur: { value: SLIDER_CONFIG.settings.timeshiftBlur },
        uTimeshiftFlow: { value: SLIDER_CONFIG.settings.timeshiftFlow },
        uTimeshiftChromatic: { value: SLIDER_CONFIG.settings.timeshiftChromatic },
        uTimeshiftTurbulence: { value: SLIDER_CONFIG.settings.timeshiftTurbulence },
    }), []);

    // Handle Resize
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    }, [size]);

    // Handle Transition
    useEffect(() => {
        if (textures.length === 0 || !materialRef.current) return;

        // If it's the first load (prev == current), just set the texture
        if (prevSlideRef.current === currentSlide && !isTransitioning) {
            materialRef.current.uniforms.uTexture1.value = textures[currentSlide];
            materialRef.current.uniforms.uTexture1Size.value = textures[currentSlide].userData.size;
            materialRef.current.uniforms.uTexture2.value = textures[currentSlide]; // Just to be safe
            materialRef.current.uniforms.uTexture2Size.value = textures[currentSlide].userData.size;
            materialRef.current.uniforms.uProgress.value = 0;
            return;
        }

        if (isTransitioning) {
            const prevTexture = textures[prevSlideRef.current];
            const nextTexture = textures[currentSlide];

            materialRef.current.uniforms.uTexture1.value = prevTexture;
            materialRef.current.uniforms.uTexture1Size.value = prevTexture.userData.size;
            materialRef.current.uniforms.uTexture2.value = nextTexture;
            materialRef.current.uniforms.uTexture2Size.value = nextTexture.userData.size;
            materialRef.current.uniforms.uProgress.value = 0;

            gsap.fromTo(
                materialRef.current.uniforms.uProgress,
                { value: 0 },
                {
                    value: 1,
                    duration: SLIDER_CONFIG.settings.transitionDuration,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (materialRef.current) {
                            materialRef.current.uniforms.uProgress.value = 0;
                            materialRef.current.uniforms.uTexture1.value = nextTexture;
                            materialRef.current.uniforms.uTexture1Size.value = nextTexture.userData.size;
                        }
                        prevSlideRef.current = currentSlide;
                        onTransitionComplete();
                    }
                }
            );
        }
    }, [currentSlide, isTransitioning, textures, onTransitionComplete]);

    const prevSlideRef = useRef(currentSlide);

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
