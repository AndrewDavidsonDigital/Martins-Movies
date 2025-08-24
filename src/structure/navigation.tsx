'use client'

import { Fragment, useState } from "react";
import { staticRoutes } from "@/app/routes";
import classNames from "classnames";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import Login from "@/structure/Login";
import { IBaseProps, IRoute } from "@/utils/interfaces";
import { MenuIcon } from "@/components/icons";

interface AnimatedMenuIconProps {
  isOpen: boolean;
}

function AnimatedMenuIcon({ isOpen }: AnimatedMenuIconProps) {
  return (
    <MenuIcon
      className="
        [&>path]:transition-all [&>path]:duration-300
        [[data-open=true]&>path.line-2]:!opacity-0
        
        [&>path.line-1]:origin-center
        [[data-open=true]&>path.line-1]:!-rotate-45
        [[data-open=true]&>path.line-1]:translate-x-[16%]
        [[data-open=true]&>path.line-1]:translate-y-[16%]

        [&>path.line-3]:origin-center
        [[data-open=true]&>path.line-3]:!rotate-45
        [[data-open=true]&>path.line-3]:translate-x-[16%]
        [[data-open=true]&>path.line-3]:translate-y-[-16%]
      "
      data-open={isOpen}
    />
  );
}

function removeScrollRoot(){
  document.getElementById('scrollRoot')?.classList.remove('overflow-clip')
}

export default function Navigation() {
  const [isMobileNavOpen, setMobileNavOpen]  = useState<boolean>(false);

  function handleMobileNavClick(){
    if(isMobileNavOpen){
      removeScrollRoot();
    }else{
      document.getElementById('scrollRoot')?.classList.add('overflow-clip');
    }
    setMobileNavOpen((old)=> !old);
  }
  
  return (
    <div className="w-full bg-white text-black grid-area-stack h-17 [&>a]:w-fit items-center px-7 sticky top-0 z-100">
      <a className="z-10" href="#">
        <Image
          className="justify-start"
          src="/logo.svg"
          alt="Brand Logo"
          height={40}
          width={160}
        />
      </a>
      {/* tablet+ links */}
      <NavigationLinks className="hidden lg:flex"/>
      <Login className="ml-auto z-10 hidden lg:flex" alerts={3}/>
      {/* tablet-- links */}
      <button 
        className="block lg:hidden ml-auto" 
        onClick={() => handleMobileNavClick()}
      >
        {/* dynamically changing css icon */}
        <AnimatedMenuIcon
          isOpen={isMobileNavOpen}
        />
      </button>
      <aside 
        className={`
          lg:hidden
          top-17 -left-7
          absolute
          bg-slate-600
          h-[calc(100dvh_-_4.25rem)]
          w-screen
          p-5
          transition-all duration-300
          ${isMobileNavOpen ? '' : 'translate-x-full' }
          z-nav
        `}
      >
        <NavigationLinks className="flex flex-col "/>
      </aside>
    </div>
  );
}

function NavigationLinks(props: IBaseProps) {
  
  return (
    <nav 
      className={`
        gap-4 w-full mx-auto justify-center
        ${props.className}
      `}
      >
      { staticRoutes && staticRoutes.length > 0 && staticRoutes.map(route => 
        <NavRoute 
          key={route.path}
          {...route}
        />
      )}
    </nav>
  );
}

function isActive(route: IRoute, pathname: string): boolean{
  return route.path === pathname || route?.alias === pathname;
}

function NavRoute( props: IRoute) {
  return (
    <Fragment>
      <Link
        href={props.alias ?? props.path}
        className={`${isActive(props, usePathname()) ? '!pointer-events-none !cursor-default text-brand underline decoration-brand' : ''}`}
      >
        <button 
          key={props.path}
          data-route={props.name}
          className={classNames(
            "transition-colors duration-500",
            "capitalize",
            "relative",
            'hover:text-brand cursor-pointer',
            isActive(props, usePathname()) ? '!pointer-events-none !cursor-default text-brand underline decoration-brand' : ''
          )}
          onClick={() => removeScrollRoot()}
        >
          {props.name}
        </button>
      </Link>      
    </Fragment>
  );
}
