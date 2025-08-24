'use client'

import { IBaseModal, IMovieCombinationDetail } from '@/utils/interfaces';
import { Modal } from './Modal';
import { closeModal, openModal } from '@/utils/modal';
import { useRef, useState } from 'react';
import { getYouTubeEmbedUrl } from '@/utils/string';

interface IShowCardProps extends IMovieCombinationDetail{
  isGrid: boolean;
  hasVideo: boolean;
}

export function ShowCard(props: IShowCardProps) {

  const modalVideo = useRef<HTMLDialogElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');


  function toggleOpenVideo(videoSrc: string){
    setVideoSrc(old => videoSrc);
    if (modalVideo.current){
      openModal(modalVideo);
    }
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
            // video / trailer should be sourced directly from the
          >
            <span className='rotate-90 text-white'>▲</span>
          </button>
        )}
        <h3 className={`text-3xl ${! (props.isGrid) ?  'md:w-fit md:mx-auto md:text-center' : ''}`}>{props.title}</h3>
        <div 
          className={`
            flex justify-between text-slate-600/60
            ${props.isGrid ? '' : 'md:hidden' }
          `}
        >
          <span>✨{(props.vote_average).toFixed(1)}/10</span>
          <span></span>
        </div>
        <p className={`line-clamp-5 ${! (props.isGrid) ? 'text-neutral-500 text-center' : '' }`}>
          {props.overview}
        </p>
        {props.imdb_id && (
          <a 
            className={`
              hover:bg-brand/90 hover:!text-white border border-slate-600 uppercase bg-brand/80 text-white w-fit mr-auto py-2 px-4 text-sm rounded-sm hover:brightness-125 duration-300 transition-all
              ${! (props.isGrid) ?  'md:mx-auto mt-auto' : ''}
            `}
            href={`https://www.imdb.com/title/${props.imdb_id}/`}
            target='_blank'
          >Read More</a>
        )}
      </div>
      <VideoModal
        modalRef={modalVideo}
        onClose={() => closeModal(modalVideo)}
        src={`${videoSrc}`}
      />
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
        <iframe 
          src={embedUrl}
          className="w-full h-full rounded-md"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </Modal>
  );
}