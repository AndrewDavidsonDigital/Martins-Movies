"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { IMovieCombinationDetail, MovieFilters } from '@/utils/interfaces';

// Action types enum - define what can modify the state
enum MoviesActionType {
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_TOTAL_PAGES = 'SET_TOTAL_PAGES',
  SET_LISTING_DATA = 'SET_LISTING_DATA',
  SET_SEARCH_TERMS = 'SET_SEARCH_TERMS',
  SET_FILTER_TYPE = 'SET_FILTER_TYPE',
  SET_DESTINATION_PAGE = 'SET_DESTINATION_PAGE',
  SET_FILTERS = 'SET_FILTERS',
  SET_LOADING = 'SET_LOADING',
  RESET_SEARCH = 'RESET_SEARCH',
  RESET_PAGINATION = 'RESET_PAGINATION'
}


interface MoviesState {
  currentPage: number;
  totalPages: number;
  listingData: IMovieCombinationDetail[];
  searchTerms: string;
  filterType: string;
  destinationPage: number;
  filters: MovieFilters;
  movies: IMovieCombinationDetail[];
  loading: boolean;
  error: string | null;
}


type MoviesAction =
  | { type: MoviesActionType.SET_CURRENT_PAGE; payload: number }
  | { type: MoviesActionType.SET_TOTAL_PAGES; payload: number }
  | { type: MoviesActionType.SET_LISTING_DATA; payload: IMovieCombinationDetail[] }
  | { type: MoviesActionType.SET_SEARCH_TERMS; payload: string }
  | { type: MoviesActionType.SET_FILTER_TYPE; payload: string }
  | { type: MoviesActionType.SET_DESTINATION_PAGE; payload: number }
  | { type: MoviesActionType.SET_FILTERS; payload: MovieFilters }
  | { type: MoviesActionType.SET_LOADING; payload: boolean }
  | { type: MoviesActionType.RESET_SEARCH; }
  | { type: MoviesActionType.RESET_PAGINATION; };

const initialState: MoviesState = {
  currentPage: 0,
  totalPages: 0,
  listingData: [],
  searchTerms: '',
  filterType: '',
  destinationPage: 1,
  filters: {
    show_filters: [],
    // Add other default filter properties as needed
  },
  movies: [],
  loading: false,
  error: null,
};


function moviesReducer(state: MoviesState, action: MoviesAction): MoviesState {
  switch (action.type) {
    case MoviesActionType.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    
    case MoviesActionType.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    
    case MoviesActionType.SET_LISTING_DATA:
      return { ...state, listingData: action.payload };
    
    case MoviesActionType.SET_SEARCH_TERMS:
      return { ...state, searchTerms: action.payload };
    
    case MoviesActionType.SET_FILTER_TYPE:
      return { ...state, filterType: action.payload };
    
    case MoviesActionType.SET_DESTINATION_PAGE:
      return { ...state, destinationPage: action.payload };
    
    case MoviesActionType.SET_FILTERS:
      return { ...state, filters: action.payload };
    
    case MoviesActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case MoviesActionType.RESET_SEARCH:
      return { 
        ...state, 
        searchTerms: '', 
        filterType: '', 
        destinationPage: 1,
        currentPage: 0 
      };
    
    case MoviesActionType.RESET_PAGINATION:
      return { 
        ...state, 
        destinationPage: 1,
        currentPage: 0 
      };
    
    default:
      return state;
  }
}

// Context interface
interface MoviesContextType {
  state: MoviesState;
  dispatch: React.Dispatch<MoviesAction>;
  filters: MovieFilters;
  setFilters: (filters: MovieFilters) => void;
  movies: IMovieCombinationDetail[];
  loading: boolean;
  error: string | null;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

interface MoviesProviderProps {
  children: ReactNode;
}

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const setFilters = (filters: MovieFilters) => {
    dispatch({ type: MoviesActionType.SET_FILTERS, payload: filters });
  };

  const contextValue: MoviesContextType = {
    state,
    dispatch,
    filters: state.filters,
    setFilters,
    movies: state.movies,
    loading: state.loading,
    error: state.error,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
}


export function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
}


export const moviesActions = {
  setCurrentPage: (page: number): { type: MoviesActionType.SET_CURRENT_PAGE; payload: number } => ({ 
    type: MoviesActionType.SET_CURRENT_PAGE, 
    payload: page 
  }),
  setTotalPages: (pages: number): { type: MoviesActionType.SET_TOTAL_PAGES; payload: number } => ({ 
    type: MoviesActionType.SET_TOTAL_PAGES, 
    payload: pages 
  }),
  setListingData: (data: IMovieCombinationDetail[]): { type: MoviesActionType.SET_LISTING_DATA; payload: IMovieCombinationDetail[] } => ({ 
    type: MoviesActionType.SET_LISTING_DATA, 
    payload: data 
  }),
  setSearchTerms: (terms: string): { type: MoviesActionType.SET_SEARCH_TERMS; payload: string } => ({ 
    type: MoviesActionType.SET_SEARCH_TERMS, 
    payload: terms 
  }),
  setFilterType: (filter: string): { type: MoviesActionType.SET_FILTER_TYPE; payload: string } => ({ 
    type: MoviesActionType.SET_FILTER_TYPE, 
    payload: filter 
  }),
  setDestinationPage: (page: number): { type: MoviesActionType.SET_DESTINATION_PAGE; payload: number } => ({ 
    type: MoviesActionType.SET_DESTINATION_PAGE, 
    payload: page 
  }),
  setFilters: (filters: MovieFilters): { type: MoviesActionType.SET_FILTERS; payload: MovieFilters } => ({ 
    type: MoviesActionType.SET_FILTERS, 
    payload: filters 
  }),
  setLoading: (loading: boolean): { type: MoviesActionType.SET_LOADING; payload: boolean } => ({ 
    type: MoviesActionType.SET_LOADING, 
    payload: loading 
  }),
  resetSearch: (): { type: MoviesActionType.RESET_SEARCH; } => ({ 
    type: MoviesActionType.RESET_SEARCH
  }),
  resetPagination: (): { type: MoviesActionType.RESET_PAGINATION; } => ({ 
    type: MoviesActionType.RESET_PAGINATION
  }),
};

export { MoviesActionType };
