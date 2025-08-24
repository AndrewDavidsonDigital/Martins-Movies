'use client'

import { resolveRouteFromPath, resolveRoutePath } from '@/app/routes';
import { IBaseProps, IMovie } from '@/utils/interfaces';
import { usePathname } from 'next/navigation'

interface IShowCardProps extends IBaseProps, IMovie{
  isGrid: boolean;
}

export function ShowCard(props: IShowCardProps) {
  
  return (
    <div 
      className={`
        bg-red-300 text-white 
        w-full 
        grid-area-stack overflow-clip
        rounded-md 
        duration-300 hover:-translate-y-4
        transition-all
        ${props.isGrid ? 'min-h-[600px] h-auto' : 'max-h-60'}
      `}
    >
      <div className='w-full bg-white'>
        <img
          alt={`${props.title}'s poster`}
          src={`https://image.tmdb.org/t/p/original/${props.poster_path}`}
          className='w-full h-auto object-contain'
        />
      </div>
      <div className='w-full h-auto p-8 bg-white mt-80 text-slate-800/80 flex flex-col gap-2'>
        <button 
          className='
            bg-brand 
            rounded-full aspect-square w-14 
            ml-auto -mt-[calc(var(--spacing)_*_14_+_2px)]
            drop-shadow-brand drop-shadow-md
            hover:scale-105 duration-500
            grid-area-stack items-center
          '
        >
          <span className='rotate-90 text-white'>▲</span>
        </button>
        <h3 className='text-3xl'>{props.title}</h3>
        <div className='flex justify-between text-slate-600/60'>
          <span>✨{(props.vote_average).toFixed(1)}/10</span>
          <span></span>
        </div>
        <p className='line-clamp-5'>
          {props.overview}
        </p>
        {props.IMDB && (
          <a 
            className='hover:!text-black border border-slate-600 uppercase bg-brand/80 text-white w-fit mr-auto py-2 px-4 text-sm rounded-sm hover:brightness-125 duration-300 transition-all'
            href={`https://www.imdb.com/title/${props.IMDB}/`}
            target='_blank'
          >Read More</a>
        )}
      </div>
    </div>
  );
}
