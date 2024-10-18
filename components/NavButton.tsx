'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function NavButton() {
  const menuRef = useRef<SVGSVGElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  
  
  useEffect(() => {
    if (!menuRef.current || !overlayRef.current || !contentRef.current) return
    
    const timeline = gsap.timeline({ 
      paused: true,
      defaults: { ease: 'power2.inOut' }
    })
    
    // Menu icon animation
    timeline
      .to('.top', {
        y: -9,
        duration: 0.2,
        transformOrigin: '50% 50%'
      }, 'burg')
      .to('.bot', {
        y: 9,
        duration: 0.2,
        transformOrigin: '50% 50%'
      }, 'burg')
      .to('.mid', {
        scale: 0.1,
        duration: 0.2,
        transformOrigin: '50% 50%'
      }, 'burg')
      .to('.top', {
        y: 5,
        duration: 0.2
      }, 'rotate')
      .to('.bot', {
        y: -5,
        duration: 0.2
      }, 'rotate')
      .to('.top', {
        rotation: 45,
        duration: 0.2,
        transformOrigin: '50% 50%'
      }, 'rotate')
      .to('.bot', {
        rotation: -45,
        duration: 0.2,
        transformOrigin: '50% 50%'
      }, 'rotate')

    // Overlay animation
    timeline
      .to(overlayRef.current, {
        scaleY: 1,
        duration: 1,
        transformOrigin: 'top',
        opacity: 1
      }, 'burg')
      // Animate menu items
      .to(contentRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
      })

    timelineRef.current = timeline

    // Set initial states
    gsap.set(overlayRef.current, { scaleY: 0 })
    gsap.set(contentRef.current.children, { y: 30, opacity: 0 })

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      timelineRef.current?.play()
    } else {
      timelineRef.current?.reverse()
    }
  }, [isOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-white z-50 opacity-0 md:hidden"
      >
        {/* Menu Content */}
        <div 
          ref={contentRef}
          className="h-full w-full flex items-center justify-center"
        >
          <nav className="text-black text-4xl">
            <ul className="space-y-6">
              <li className="hover:text-gray-400 transition-colors">
                <a href="#home">Home</a>
              </li>
              <li className="hover:text-gray-400 transition-colors">
                <a href="#services">Services</a>
              </li>
              <li className="hover:text-gray-400 transition-colors">
                <a href="#services">Gift Cards</a>
              </li>
              <li className="hover:text-gray-400 transition-colors">
                <a href="#about">About</a>
              </li>

              <li className="hover:text-gray-400 transition-colors">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Menu Button */}
      <div className="fixed top-0 right-0 z-50 p-6 md:hidden">
        <button 
          onClick={handleClick} 
          className="relative flex items-center justify-center w-12 h-12 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            ref={menuRef}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="top"
              d="M0 9h30v2H0z"
              fill="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className="mid"
              x1="0"
              y1="15"
              x2="30"
              y2="15"
              stroke="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="bot"
              d="M0 19h30v2H0z"
              fill="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </button>
      </div>
    </>
  )
}