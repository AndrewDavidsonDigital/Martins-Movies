'use client'

import { IMovieCombinationDetail } from '@/utils/interfaces';

interface IShowCardProps extends IMovieCombinationDetail{
  isGrid: boolean;
  hasVideo: boolean;
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
        h-auto
        ${props.isGrid ? 'min-h-[600px]' : 'md:max-h-80'}
      `}
    >
      {/* bg image */}
      <div 
        className={`
          w-full bg-[#C4C4C4]
          ${!(props.isGrid) ? 'md:max-w-2/5 md:grayscale-75' : ''}
        `}
      >
        {props.poster_path && (
          <img
            alt={`${props.title}'s poster`}
            src={`https://image.tmdb.org/t/p/original/${props.poster_path}`}
            className='w-full h-auto object-contain'
          />
        )}
        {!(props.poster_path) && (
          <img
            alt={`${props.title}'s poster`}
            src={`/placeholder-image.jpg`}
            className='w-full h-auto min-h-20 object-contain'
          />
        )}
      </div>
      
      {/* grid bg-overlay gradient */}
      {!(props.isGrid) && (
        <div 
          className="
            hidden md:block 
            z-10
            w-full h-80 
            bg-gradient-to-r
            from-slate-800  via-transparent to-slate-800 
            from-2% via-15% to-40%
          "
        ></div>
      )}
      
      <div 
        className={`
          w-full h-auto 
          flex flex-col gap-2 
          p-8 mt-80 
          z-10
          bg-white text-slate-800/80
          ${! (props.isGrid) ?  'md:max-h-80 md:mt-0 md:ml-[40%] md:w-[60%] md:bg-transparent md:text-white' : '' }
        `}
      >
        {/* play video button */}
        {props.hasVideo && (
          <button 
            className={`
              bg-brand 
              z-100
              rounded-full aspect-square w-14 
              ml-auto -mt-[calc(var(--spacing)_*_14_+_2px)]
              drop-shadow-brand drop-shadow-md
              hover:scale-105 duration-500
              grid-area-stack items-center
              ${! (props.isGrid) ?  'md:absolute md:mb-auto md:mr-auto md:ml-[-25%] md:mt-20' : '' }
            `}
          >
            <span className='rotate-90 text-white'>▲</span>
          </button>
        )}
        <h3 className='text-3xl'>{props.title}</h3>
        <div className='flex justify-between text-slate-600/60'>
          <span>✨{(props.vote_average).toFixed(1)}/10</span>
          <span></span>
        </div>
        <p className='line-clamp-5'>
          {props.overview}
        </p>
        {props.imdb_id && (
          <a 
            className='hover:!text-black border border-slate-600 uppercase bg-brand/80 text-white w-fit mr-auto py-2 px-4 text-sm rounded-sm hover:brightness-125 duration-300 transition-all'
            href={`https://www.imdb.com/title/${props.imdb_id}/`}
            target='_blank'
          >Read More</a>
        )}
      </div>
    </div>
  );
}
