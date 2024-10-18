"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Lenis from 'lenis'

export default function Home() {
  const holdersRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const textLinesRef = useRef<HTMLSpanElement[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    holdersRef.current.forEach((holder, index) => {
      const img = holder.querySelector('img');
      if (img) imageRefs.current[index] = img as HTMLImageElement;
    });

    const tl = gsap.timeline();

    gsap.set(textContainerRef.current, { opacity: 0 });
    gsap.set(textLinesRef.current, { 
      yPercent: 100,
      opacity: 0
    });

    tl.fromTo(
      holdersRef.current,
      { 
        yPercent: 100, 
        opacity: 0 
      },
      { 
        duration: 1,
        yPercent: 0, 
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out"
      }
    )
    .fromTo(
      imageRefs.current,
      { 
        yPercent: -100, 
        opacity: 0 
      },
      { 
        duration: 1,
        yPercent: 0, 
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out"
      },
      "<"
    )

    .addLabel('startExpansion', '+=0.5')
    .set(imageRefs.current[1], {
      transformOrigin: 'center center'
    }, 'startExpansion')

    .to(
      [holdersRef.current[0], holdersRef.current[2]], 
      { 
        duration: 1.3, 
        width: 0, 
        opacity: 0,
        ease: "power3.inOut",
        padding: 0,
        margin: 0
      },
      'startExpansion'
    )

    .to(
      containerRef.current,
      {
        duration: 1.3,
        height: '100vh',
        ease: "power2.inOut"
      },
      'startExpansion'
    )
    .to(
      holdersRef.current[1], 
      { 
        duration: 1.3, 
        width: '100vw', 
        height: '100vh', 
        ease: "power2.inOut",
        margin: 0
      },
      'startExpansion'
    )

    // Scale up the middle image smoothly
    .to(
      imageRefs.current[1],
      {
        duration: 1.3,
        scale: 1.2,
        ease: "power3.inOut"
      },
      'startExpansion'
    )

    // Text reveal animation
    .to(
      textContainerRef.current,
      {
        opacity: 1,
        duration: 0.3
      }
    )
    .to(
      textLinesRef.current,
      {
        yPercent: 0,
        opacity: 1,
        display: 'block',
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

  }, []);

  return (
    <main>
      <div className="relative flex justify-center items-center h-screen">
        <div 
          ref={containerRef} 
          className="flex flex-row w-auto h-[600px] overflow-hidden relative space-x-4"
        >
          <div 
            ref={el => { if (el) holdersRef.current[0] = el }} 
            className="holder overflow-hidden w-[400px] mx-2"
          >
            <img 
              src="/photo.avif" 
              alt="" 
              className="block object-cover w-full h-full transform-gpu" 
            />
          </div>
          <div 
            ref={el => { if (el) holdersRef.current[1] = el }} 
            className="holder overflow-hidden w-[400px]"
          >
            <img 
              src="/2.jpg" 
              alt="" 
              className="block object-cover w-full h-full transform-gpu" 
            />
          </div>
          <div 
            ref={el => { if (el) holdersRef.current[2] = el }} 
            className="holder overflow-hidden w-[400px] mx-2"
          >
            <img 
              src="/third.avif" 
              alt="" 
              className="block object-cover w-full h-full transform-gpu" 
            />
          </div>
        </div>
      </div>
    <div ref={textContainerRef} className="absolute inset-0 flex items-center justify-center p-4 text-white">
      <h1 className="text-5xl font-bold leading-snug overflow-hidden">
        <span ref={el => { if (el) textLinesRef.current[0] = el }} className="block opacity-0">
          CAPTURE STUNNING VISUALS IN OUR
        </span>
        <span ref={el => { if (el) textLinesRef.current[1] = el }} className="block opacity-0">
          FULLY EQUIPPED LONDON STUDIO
        </span>
      </h1>
    </div>
      <div className="relative flex justify-center items-center h-screen">2</div>

    </main>
  );
}