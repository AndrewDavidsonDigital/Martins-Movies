'use client'

import { resolveRouteFromPath, resolveRoutePath } from '@/utils/routes';
import { usePathname } from 'next/navigation'
import { Fragment } from 'react';

export function HeroBanner() {

  const pathName = usePathname();

  const routeConfig = resolveRouteFromPath(pathName);
  let routeStruct: string[]  = [''];
  if (routeConfig){
    routeStruct = resolveRoutePath(routeConfig);
  }
  
  return (
    <div className="w-screen text-white h-45 grid-area-stack">
      <div className="bg-[url(/banner.jpg)]"></div>
      <div className="bg-gradient-to-t from-violet-800/80 via-pink-800/80 to-pink-800/80 via-75% grayscale-50"></div>
      <div className="flex flex-col gap-4 max-w-[min(var(--spacing-content),90%)] w-full mx-auto my-auto z-10">
        <h3 className='text-4xl'>{routeConfig?.name}</h3>
        <div className="flex gap-2 text-base font-light">
          {routeStruct.length > 1 && routeStruct.map((segment, segIndex) => (
            <Fragment key={`banner_segment_${segIndex}`}>
              {segIndex < routeStruct.length -1 && (
                <Fragment>
                  <a className='capitalize' href={`${segIndex === 1 ?  routeStruct.toSpliced(routeStruct.length-1).join('/')
: '/' }`}>{segment}</a>
                  <div className='w-[1px] bg-white'></div>
                </Fragment>
              )}
              {segIndex >= routeStruct.length -1 && (
                <div className='capitalize text-slate-400'>{segment}</div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
