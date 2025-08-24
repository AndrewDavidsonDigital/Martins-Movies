'use client'

import { IBaseModal, IMovieCombinationDetail } from '@/utils/interfaces';
import { Modal } from './Modal';
import { closeModal, openModal } from '@/utils/modal';
import { useRef, useState } from 'react';
import { getYouTubeEmbedUrl } from '@/utils/string';
import Image from 'next/image';
import { LinkElement } from '@/components';
import { HeartIcon, ShareIcon } from './icons';

interface IShowCardProps extends IMovieCombinationDetail{
  isGrid: boolean;
  hasVideo: boolean;
}

  function GenresDisplay({ genres, className }: { genres: { id: number; name: string }[]; className?: string }) {
  const displayGenres = genres.toSpliced(0, genres.length - 2);
  
  return (
    <span className={className}>
      {displayGenres.map((genre, genreIndex) => (
        <span key={genre.id}>
          {genre.name}{genreIndex < displayGenres.length - 1 ? ', ' : ''}
        </span>
      ))}
    </span>
  );
}

export function ShowCard(props: IShowCardProps) {

  const modalVideo = useRef<HTMLDialogElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');


  function toggleOpenVideo(videoSrc: string){
    setVideoSrc(_old => videoSrc);
    if (modalVideo.current && !(modalVideo.current.open)){
      openModal(modalVideo);
    }
  }

  function formatRating(voteAverage: number | string): string {
    const rating = Number(voteAverage);
    const formattedRating = rating.toFixed(1);
    
    // Remove decimal if it's .0
    if (formattedRating.endsWith('.0')) {
      return `${formattedRating.slice(0, -2)}/10`;
    }
    
    return `${formattedRating}/10`;
  }
  
  return (
    <div 
      className={`
        group
        text-white 
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
          <Image
            alt={`${props.title}'s poster`}
            src={`/placeholder-image.jpg`}
            className='w-full h-auto min-h-20 object-contain'
            width={100}
            height={100}
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
            from-[#343A40]  via-transparent to-[#343A40] 
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
          ${! (props.isGrid) ?  'md:py-13 md:max-h-80 md:mt-0 md:ml-[40%] md:w-[60%] md:bg-transparent md:text-white' : '' }
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
              ${! (props.isGrid) ?  'md:group-hover:scale-100 md:scale-0 md:absolute md:mb-auto md:mr-auto md:ml-[-25%] md:mt-22' : '' }
            `}
            onClick={() => toggleOpenVideo('https://youtu.be/Q0CbN8sfihY')}
            // video / trailer should be sourced directly from the data but currently not in value
          >
            <span className='rotate-90 text-white'>▲</span>
          </button>
        )}
        <h3 className={`text-3xl font-semibold tracking-tight ${! (props.isGrid) ?  'md:w-fit md:mx-auto md:text-center' : ''}`}>{props.title}</h3>
        { !(props.isGrid) && (
          <GenresDisplay genres={props.genres} className='mx-auto opacity-75 text-sm' />
        )}
        <div 
          className={`
            flex justify-between text-slate-600/60
            ${props.isGrid ? '' : 'md:hidden' }
          `}
        >
          <span className="font-medium text-sm">✨{formatRating(props.vote_average)}</span>
          <GenresDisplay genres={props.genres} className="text-sm opacity-80" />
        </div>
        <p className={`line-clamp-5 text-neutral-500 text-sm leading-relaxed ${! (props.isGrid) ? 'text-center' : '' }`}>
          {props.overview}
        </p>
        {!(props.isGrid) && (
          <span className="hidden md:block mx-auto font-medium text-sm text-white/60">✨{formatRating(props.vote_average)}</span>
        )}
        {props.imdb_id && (
          <LinkElement
            className={!(props.isGrid) ?  'md:mx-auto' : '' }
            href={`https://www.imdb.com/title/${props.imdb_id}/`}
            isExternal
            label='Read More'
          />
        )}
        <div className='absolute flex gap-2 -mt-10 -ml-[40%] z-10'>
          <button 
            className='hover:opacity-100 group-hover:opacity-100 opacity-40 duration-300 transition-all hover:brightness-150 relative group/rate'
          >
            <HeartIcon className='group-hover/rate:stroke-brand hover:stroke-brand'/>
            <div className='absolute mt-2 translate-x-[calc(-50%_+12px)] w-fit h-0 overflow-clip hover:overflow-visible group-hover/rate:overflow-visible group-hover/rate:h-auto bg-black text-sm font-thin rounded-sm grid-area-stack'>
              <div className='bg-black rotate-45 size-2 mx-auto -mt-1'></div>
              <p className=' px-2 py-1'>Rate</p>
            </div>
          </button>
          <button 
            className='hover:opacity-100 group-hover:opacity-100 opacity-40 duration-300 transition-all hover:brightness-150 relative group/share'
          >
            <ShareIcon className='group-hover/share:stroke-brand hover:stroke-brand'/>
            <div className='absolute mt-2 translate-x-[calc(-50%_+12px)] w-fit h-0 overflow-clip hover:overflow-visible group-hover/share:overflow-visible group-hover/share:h-auto bg-black text-sm font-thin rounded-sm grid-area-stack'>
              <div className='bg-black rotate-45 size-2 mx-auto -mt-1'></div>
              <p className=' px-2 py-1'>Share</p>
            </div>
          </button>
        </div>
      </div>
      {props.hasVideo && (
        <VideoModal
          modalRef={modalVideo}
          onClose={() => closeModal(modalVideo)}
          src={`${videoSrc ? videoSrc : null}`}
        />
      )}
    </div>
  );
}

function VideoModal(props: IBaseModal & { src: string }) {
  const embedUrl = getYouTubeEmbedUrl(props.src);
  
  return (
    <Modal
      modalRef={props.modalRef}
      onClose={props.onClose}
      size="lg"
      borderless
    >
      <div className="w-full h-96">
        {props.src.length > 0 && (
          <iframe 
            src={embedUrl}
            className="w-full h-full rounded-md"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  );
}