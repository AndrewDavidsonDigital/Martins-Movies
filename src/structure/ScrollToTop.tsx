"use client"

import { ChevronIcon } from '@/components/icons';
import { IBaseProps } from '@/utils/interfaces';
import React, { useState } from 'react';

interface IScrollToTopProps extends IBaseProps {
  targetId: string;
}

export default function ScrollToTop(props: IScrollToTopProps) {

  const [shouldHide, _setShouldHide] = useState<boolean>(false);
  
  const scrollToTop = () => {
    document.getElementById(props.targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button 
      className={`
        fixed rounded-full 
        z-10
        !bg-brand 
        aspect-square w-10 
        bottom-6 right-6
        transition-all duration-500
        drop-shadow-md drop-shadow-brand
        grid items-center place-content-center
        -rotate-90
        ${shouldHide ? 'opacity-0' : ''}
      `}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronIcon />
    </button>
  );
}
