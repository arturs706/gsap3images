"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Nav = ({ delay = 4000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      console.log(isHomePage)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [delay, isHomePage]);

  return (
    <div 
      className={`
        fixed top-0 left-0 w-full z-50 p-10
        transition-all duration-700 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        hidden md:block
      `}
    >
      <div className="flex items-start justify-between flex-col text-white">
        <h1 className='text-2xl font-bold'>- HOME</h1>
        <h1>SERVICES</h1>
        <h1>GIFTS</h1>
        <h1>PRICING</h1>
        <h1>ABOUT</h1>
        <h1>CONTACT</h1>
      </div>
    </div>
  )
}

export default Nav;
