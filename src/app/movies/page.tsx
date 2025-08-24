import { HeroBanner, MoviesListing } from "@/components";
import PageWrapper from "@/structure/pageWrapper";
import { API_URL_MOVIE_LISTING, apiService } from "@/utils/api";
import { IDiscoverMoviesAPI, IMovie } from "@/utils/interfaces";

export default function MoviesListPage() {

  const filterOptions = [
    'Default Order',
    'Featured',
    'Top Viewed',
    'Top Rated',
    'Newest',
    'Oldest',
  ]
  
  return (
    <PageWrapper>
      <div className="flex gap-4 items-center flex-col">
        <HeroBanner />
        <MoviesListing filterOptions={filterOptions} />
      </div>
    </PageWrapper>
  );
}
