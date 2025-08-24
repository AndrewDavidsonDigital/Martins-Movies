import Footer, { IFooterProps } from "@/structure/footer";
import Navigation from "@/structure/navigation";
import ScrollToTop from "@/structure/ScrollToTop";
import { Fragment } from "react";

const SCROLL_HOOK_ID = "scrollToHook";

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  /**
   * these would usually be pulled from the cms
   */
  const footerData: IFooterProps = {
    sections: [
      {
        title: 'Useful Links',
        links: [{
          label: 'About',
          destination: '#',
        },{
          label: 'Blog',
          destination: '#',
        },{
          label: 'Forum',
          destination: '#',
        },{
          label: 'My Account',
          destination: '#',
        },{
          label: 'Watch List',
          destination: '#',
        }]
      },
      {
        title: 'Latest News',
        links: [{
          label: 'Post-1',
          subHeading: 'August 13, 2025',
          destination: '#',
        },{
          label: 'Post-2',
          subHeading: 'August 13, 2025',
          destination: '#',
        },{
          label: 'Post-3',
          subHeading: 'August 13, 2025',
          destination: '#',
        }]
      }
    ],
    socials: {
      title: "Follow us",
      copy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      links: {
        facebook: "#",
        instagram: "#",
        pinterest: "#",
        twitter: "#",
      }
    },
    brandCopy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque. Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum accusantium et fugit."
  }

  return (
    <Fragment>
      <span className="opacity-0 size-0" id={SCROLL_HOOK_ID}></span>
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen pb-20 relative">
        <Navigation />
        <main className="flex flex-col row-start-2 items-center sm:items-start bg-slate-100 text-black w-full">
          { children }
        </main>
        <Footer className="mt-auto" {...footerData} />
        <ScrollToTop targetId={SCROLL_HOOK_ID} />
      </div>
    </Fragment>
  );
}
