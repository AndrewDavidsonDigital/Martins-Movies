"use client"

import { ShowCard, Pagination, Input, MoviesStatus } from "@/components";
import { API_URL_KEYWORD_IDS, API_URL_KEYWORD_IDS_BINDINGS, API_URL_MOVIE_FULL_DETAILS, API_URL_MOVIE_FULL_DETAILS_BINDINGS, API_URL_MOVIE_LISTING, apiService } from "@/utils/api";
import { IDiscoverMoviesAPI, IKeywordsAPI, IMovie, IMovieCombinationDetail, IMovieDetailAPI,  } from "@/utils/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { GridIcon, ListIcon, SearchIcon } from "@/components/icons";
import { useMovies, moviesActions } from "@/contexts";

const MAX_KEYWORDS = 5;

enum FILTER_OPTIONS {  
  'Default Order' = "",
  'Featured' = "sort_by=revenue.desc&primary_release_year=2025", // not defined so use in conjunction with current year
  'Top Viewed' = "sort_by=popularity.desc",
  'Top Rated' = "sort_by=vote_average.desc",
  'Newest' = "sort_by=primary_release_date.desc",
  'Oldest' = "sort_by=primary_release_date.asc",
}

export function MoviesListing() {  
  const { state, dispatch } = useMovies();
  const {
    currentPage,
    totalPages,
    listingData,
    searchTerms,
    filterType,
    destinationPage,
    loading
  } = state;

  const [isGridLayout, setGridLayout] = useState<boolean>(true);
  const filterOptions = Object.keys(FILTER_OPTIONS);

  useEffect(() => {
    refreshData();
  },[]);

  async function refreshData(){
    console.log(`${Date.now()}: calling refresh`)
    dispatch(moviesActions.setLoading(true));
    
    // baseline filters to exclude NSFW and tv-series??
    let selectionDetails = '?language=en-US&include_adult=false&include_video=false';

    if (searchTerms.length > 0){
      // selectionDetails +=  (`&with_keywords=${searchTerms}`).trim();

      const keywordIdsData = await apiService.get(
        `${API_URL_KEYWORD_IDS.replaceAll(API_URL_KEYWORD_IDS_BINDINGS[0], `${searchTerms.toLowerCase()}`)}`, 
        API_URL_KEYWORD_IDS
      );
      if (keywordIdsData.success && keywordIdsData.response){
        const keywordIdsAsObject = JSON.parse(keywordIdsData.response) as IKeywordsAPI;
        const keywordsString = keywordIdsAsObject.results
          .map(el => el.id)
          .toSpliced(0,keywordIdsAsObject.results.length - MAX_KEYWORDS)
          .join('|')
        ;
        selectionDetails +=  (`&with_keywords=${keywordsString}`);
      }
    }

    if (filterType.length > 0 && filterType !== 'Default Order'){
      selectionDetails +=  `&${FILTER_OPTIONS[filterType as keyof typeof FILTER_OPTIONS]}`;
    }

    if (destinationPage !== 0 ){
      selectionDetails +=  `&page=${destinationPage}`;
    }

    selectionDetails = selectionDetails.replaceAll(' ','%20');

    try {
      const data = await apiService.get(`${API_URL_MOVIE_LISTING}${selectionDetails}`, API_URL_MOVIE_LISTING);
      
      if (data.success && data.response){
        // really should zod validate that our return value is of expected schema here.
        // for now just cast it
        const asObject = JSON.parse(data.response) as IDiscoverMoviesAPI;

        dispatch(moviesActions.setCurrentPage(asObject.page));
        dispatch(moviesActions.setTotalPages(asObject.total_pages));

        // Use Promise.all to wait for all API calls to complete
        const moviePromises = asObject.results.map(async (movie) => {
          try {
            const externalIdData = await apiService.get(
              `${API_URL_MOVIE_FULL_DETAILS.replaceAll(API_URL_MOVIE_FULL_DETAILS_BINDINGS[0], `${movie.id}`)}`, 
              API_URL_MOVIE_FULL_DETAILS
            );
            
            if (externalIdData.success && externalIdData.response){
              // again... really should zod validate that our return value is of expected schema here.
              // for now just cast it
              const fullDetailsAsObject = JSON.parse(externalIdData.response) as IMovieDetailAPI;
              return {
                ...movie,
                ...fullDetailsAsObject,
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching details for movie ${movie.id}:`, error);
            return null;
          }
        });

        const movieResults = await Promise.all(moviePromises);
        const validResults = movieResults.filter(movie => movie !== null) as IMovieCombinationDetail[];
        
        console.log('Final movie results:', validResults.length);
        dispatch(moviesActions.setListingData(validResults));
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      dispatch(moviesActions.setLoading(false));
    }
  }

  const handlePageChange = (page: number) => {
    dispatch(moviesActions.setDestinationPage(page));
    refreshData();
  };

  function handleSearch(){
    console.log('Searching. . . ');
    refreshData();
  }

  function handleFilterChange(e: ChangeEvent<HTMLSelectElement>){
    dispatch(moviesActions.setFilterType(e.target.value));
    refreshData();
  }

  return (
    <div className="mt-24 max-w-[min(var(--spacing-content),90%)] w-[min(var(--spacing-content),90%)] flex flex-col gap-8 mb-32">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {/* Layout selector */}
        <div className="flex gap-2">
          <button 
            className={`
              p-2 bg-slate-200 hover:bg-brand hover:brightness-150 hover:text-slate-400 rounded-md aspect-square h-10 transition-all duration-300
              ${isGridLayout ? '' : '!bg-brand !text-slate-200'}
            `} 
            onClick={() => setGridLayout(false)}
          >
            <ListIcon />
          </button>
          <button 
            className={`
              p-2 bg-slate-200 hover:bg-brand hover:brightness-150 hover:text-slate-400 rounded-md aspect-square h-10 transition-all duration-300
              ${!isGridLayout ? '' : '!bg-brand !text-slate-200'}
            `} 
            onClick={() => setGridLayout(true)}
          >
            <GridIcon />
          </button>
        </div>
        {/* Filter */}
        <select 
          className="py-2 px-4 h-10 rounded-md border bg-white border-slate-400 text-slate-600 w-fit md:w-60 lg:w-68 appearance-none"
          onChange={(e)=> handleFilterChange(e)}
          value={filterType}
        >
          {filterOptions.map((filter, filterIndex) => (
            <option key={`show_filters_${filterIndex}`} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>
      {/* Search bar for `keywords */}
      <div className="grid-area-stack min-w-[min(var(--spacing-content),100%)]  max-w-[min(var(--spacing-content),90%)] md:max-w-[550px] h-12 mx-auto">
        <Input
          className="[&>input]:pr-[calc(var(--spacing)_*_(12+2))]"
          name="listings_search"
          placeholder="Search for Moive"
          type="text"
          onKbEnter={() => handleSearch()}
          onChange={(e) => dispatch(moviesActions.setSearchTerms(e))}
          value={searchTerms}
        /> 
        <button 
          className="aspect-square ml-auto h-12 px-4 bg-brand rounded-r-md text-white"
          onClick={() => handleSearch()}
        >
          <SearchIcon className="scale-125"/>
        </button>
      </div>
      {/* Results Display */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-100 flex items-center justify-center rounded-lg pointer-events-none">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium">Loading movies...</p>
            </div>
          </div>
        )}
        <div 
          className={`
            grid gap-8
            ${isGridLayout ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}
            md:max-w-[min(var(--spacing-content),90%)] min-w-full
          `}
        >
          {listingData.map((cardData, index) => (
            <ShowCard {...cardData} key={`show_card_${cardData.id}`} isGrid={isGridLayout} hasVideo={index === 0}/>
          ))}
        </div>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      </div>
      {/* Pagination */}
    </div>
  );
}
