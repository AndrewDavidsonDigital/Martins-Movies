import { ReactNode } from 'react';

interface LinkProps {
  children?: ReactNode;
  destination: string;
  isOffsite?: boolean;
  isInverted?: boolean;
  copy: string;
}

export function LinkElement(props: LinkProps) {
  return (
    <a
      className={cn(
        "rounded-full border border-solid border-transparent",
        "transition-colors",
        "flex items-center justify-center",
        "font-medium text-sm sm:text-base",
        "h-10 sm:h-12 w-fit",
        props.isInverted ? 
          "border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent" : 
          "hover:bg-[#383838] dark:hover:bg-[#ccc] bg-foreground text-background",
        props.children ? "gap-2 px-4 sm:px-5" : "px-5 sm:px-6"
      )}
      href={props.destination}
      target={props.isOffsite ? "_blank" : "_self"}
      rel="noopener noreferrer"
  >
    { props.children }
    { props.copy }
  </a>
  );
}