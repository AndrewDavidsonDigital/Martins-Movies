"use client"

import { IBaseProps } from '@/utils/interfaces';
import React, { useState } from 'react';

interface IScrollToTopProps extends IBaseProps {
  targetId: string;
}

export default function ScrollToTop(props: IScrollToTopProps) {

  const [shouldHide, _setShouldHide] = useState<boolean>(true);
  
  const scrollToTop = () => {
    document.getElementById(props.targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button 
      className={`
        fixed rounded-full border 
        border-fuchsia-500 bg-violet-700 
        aspect-square w-10 
        bottom-6 right-6
        transition-all duration-500
        ${shouldHide ? 'opacity-0' : ''}
      `}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
    </button>
  );
}
