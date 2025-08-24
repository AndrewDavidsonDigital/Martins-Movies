import Image from "next/image";
import PageWrapper from "@/structure/PageWrapper";
import { HeroBanner } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <HeroBanner/>
      <div className="mx-auto min-h-[60dvh] max-w-content grid items-center px-5">
        <p>Landing page spacer as the page task indicates that the page to build will be within a larger system by the design. <br/> As such the constructed page and functionality is located at <Link href="/movies" className="text-brand hover:brightness-125">/movies</Link></p>
      </div>
    </PageWrapper>
  );
}
