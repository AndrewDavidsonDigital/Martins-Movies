import { IBaseProps } from "@/utils/interfaces";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon } from "@/components/icons";

export interface IFooterProps extends IBaseProps{
  sections: {
    title: string;
    links: {
      label: string;
      subHeading?: string;
      destination: string;
    }[]
  }[];
  socials: {
    title: string;
    copy: string;
    links:{
      instagram?: string;
      twitter?: string;
      facebook?: string;
      pinterest?: string;
    }
  }
  brandCopy: string;
}

// Local component for footer sections that handles the iteration
function FooterSections({ sections }: { sections: IFooterProps['sections'] }) {
  return (
    <>
      {sections.map((section, secIndex) => (
        <div key={`footer_section_${secIndex}`} className="h-full">
          <h4 className="text-2xl font-semibold mb-10">{section.title}</h4>
          <ul className="flex justify-center gap-x-5 gap-y-2 flex-col ml-4 md:ml-0 w-fit">
            {section.links.map((link, linkIndex) => (
              <li key={`footer_link_${secIndex}-${linkIndex}`}>
                <a href={link.destination ? link.destination : '#'}>
                  <span className="flex flex-col">
                    <p className={` ${!(link?.subHeading) ? 'hover:translate-x-3 duration-300 transition-all' : ''} `}>{link.label}</p>
                    {link?.subHeading && (
                      <p className="text-sm text-white/50">{link.subHeading}</p>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

// Local component for footer socials
// no animations as this is fluff that can be added / customised later.
function FooterSocials({ socials }: { socials: IFooterProps['socials'] }) {
  return (
    <div className="h-full">
      <h4 className="text-2xl font-semibold mb-10">{socials.title}</h4>
      <p>{socials.copy}</p>
      <ul className="flex gap-x-3 mr-auto">
        {socials.links.facebook && (
          <li>
            <a href={socials.links.facebook} className="group">
              <div className="grid-area-stack items-center justify-center rounded-full border border-slate-400 aspect-square w-8">
                <FacebookIcon   className="group-hover:text-blue-600 duration-300"/>
              </div>
            </a>
          </li>
        )}
        {socials.links.instagram && (
          <li>
            <a href={socials.links.instagram} className="group">
              <div className="grid-area-stack items-center justify-center rounded-full border border-slate-400 aspect-square w-8">
                <InstagramIcon  className="group-hover:text-amber-700 duration-300"/>
              </div>
            </a>
          </li>
        )}
        {socials.links.twitter && (
          <li>
            <a href={socials.links.twitter} className="group">
              <div className="grid-area-stack items-center justify-center rounded-full border border-slate-400 aspect-square w-8">
                <TwitterIcon  className="group-hover:text-blue-400 duration-300"/>
              </div>
            </a>
          </li>
        )}
        {socials.links.pinterest && (
          <li>
            <a href={socials.links.pinterest} className="group">
              <div className="grid-area-stack items-center justify-center rounded-full border border-slate-400 aspect-square w-8">
                <PinterestIcon  className="group-hover:text-red-500 duration-300"/>
              </div>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

// Local component for footer links
function FooterCopyright() {
  return (
    <div className="flex flex-col lg:flex-row justify-between max-w-[min(var(--spacing-content),90%)] mx-auto w-full">
      <ul className="flex justify-center gap-x-5 gap-y-2 flex-wrap">
        <li className=""><a href="#">Privacy &amp; Cookies</a></li>
        <li className=""><a href="#">Terms &amp; Conditions</a></li>
        <li className=""><a href="#">Legal Disclaimer</a></li>
        <li className=""><a href="#">Community</a></li>
      </ul>
      <div className="w-fit mx-auto lg:mr-0 mt-4 lg:mt-0"> 
        <p>All Rights Reserved by <a href="#">Movify</a>.</p>
      </div>
    </div>
  );
}

export default function Footer(props: IFooterProps) {
  return (
    <footer 
      className={cn(
        "flex flex-col pt-10",
        props.className,
      )}
    >
      <div 
        className="
          grid gap-y-12 md:gap-6
          grid-cols-1 md:grid-cols-[repeat(2,50%)] lg:grid-cols-[repeat(4,min(260px,25%))] 
          items-center justify-center
          mx-auto
          max-w-[min(var(--spacing-content),90%)]
        "
      >
        <div className="flex flex-col">
          <a className="mb-10" href="#">
            <Image
              className="justify-start size-auto"
              src="/logo-white.svg"
              alt="Brand Logo"
              height={25}
              width={110}
            />
          </a>
          <p>{props.brandCopy}</p>
        </div>
        <FooterSections sections={props.sections} />
        <FooterSocials socials={props.socials} />
      </div>
      <hr className="mb-2 mt-20 w-screen"></hr>
      <FooterCopyright />
    </footer>
  );
}
