import { HeroBanner } from "@/components";
import PageWrapper from "@/structure/PageWrapper";
import { MoviesListing } from "./MoviesListing";

export default function MoviesListPage() {
  
  return (
    <PageWrapper>
      <div className="flex gap-4 items-center flex-col">
        <HeroBanner />
        <MoviesListing />
      </div>
    </PageWrapper>
  );
}
