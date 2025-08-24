export interface IBaseProps {
  className?: string;
}

interface IIMDB{
  IMDB?: string;
}

export interface IMovie extends IIMDB {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
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

export interface IMovieExternalAPI {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}