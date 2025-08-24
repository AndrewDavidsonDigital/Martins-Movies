import { RefObject } from "react";

export interface IBaseProps {
  className?: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IDiscoverMoviesAPI {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
/*
export interface IMovieExternalAPI {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}
*/

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ICollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}


export interface IMovieDetailAPI {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: ICollection | null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieCombinationDetail extends IMovie, IMovieDetailAPI{}

export interface MovieFilters {
  show_filters: string[];
  // Add other filter properties as needed
}


export interface IKeywordsAPI {
  page: number;
  results: IKeyword[];
  total_pages: number;
  total_results: number;
}

export interface IKeyword {
  id: number;
  name: string;
}


export interface IBaseModal {
  modalRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}
export interface IBaseModalWithOpen {
  onOpenModal: (modalRef: RefObject<HTMLDialogElement | null>) => void;
}


export interface IRoute {
  name: string;
  alias?: string;
  path: string;
}