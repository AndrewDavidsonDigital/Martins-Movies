import Image from "next/image";
import PageWrapper from "@/structure/PageWrapper";
import { HeroBanner, LinkElement } from "@/components";

export default function Home() {
  return (
    <PageWrapper>
      <HeroBanner/>
      <div className="mx-auto">TBD - Landing</div>
    </PageWrapper>
  );
}
