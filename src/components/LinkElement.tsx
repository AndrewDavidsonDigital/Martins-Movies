import { IBaseProps } from '@/utils/interfaces';

interface ILinkElement extends IBaseProps{
  label: string;
  isExternal?: boolean;
  href: string;
}

export function LinkElement(props: ILinkElement) {
  return (
    <a 
    className={`
      uppercase
      font-medium tracking-wide
      hover:brightness-125
      hover:bg-brand/90 hover:!text-white bg-brand/80 text-white 
      w-fit 
      py-2 px-4 
      mr-auto text-sm rounded-sm duration-300 transition-all
      mt-auto
      ${props.className}
    `}
    href={props.href}
    target={props?.isExternal ? '_blank' : 'none'}
  >{props.label}</a>
  );
}