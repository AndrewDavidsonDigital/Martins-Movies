
export const API_URL_MOVIE_DETAIL = 'https://api.themoviedb.org/3/movie/'
export const API_URL_MOVIE_LISTING = 'https://api.themoviedb.org/3/discover/movie'
export const API_URL_MOVIE_EXTERNAL_LINKS_BINDINGS = ['__id__'];
export const API_URL_MOVIE_EXTERNAL_LINKS = `https://api.themoviedb.org/3/movie/${API_URL_MOVIE_EXTERNAL_LINKS_BINDINGS[0]}/external_ids`

// Get API token from environment variable
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

interface ApiResponse {
  success: boolean;
  response?: string;
  error?: string;
  until?: string;
}

// Create headers with API token for TMDB requests
const createTMDBHeaders = () => {
  const headers = new Headers();
  if (TMDB_API_TOKEN) {
    headers.set('Authorization', `Bearer ${TMDB_API_TOKEN}`);
  }
  return headers;
};


class ApiService {
  async get(url: string, key: string): Promise<ApiResponse> {
    try{
      switch (key) {
        case API_URL_MOVIE_EXTERNAL_LINKS: {

          const headers = createTMDBHeaders();

          const result = await fetch(url, { headers, });
          const dataJson = await result.json();

          return {
            success: true,
            response: `${JSON.stringify(dataJson)}`,
          } as ApiResponse;
        }
        case API_URL_MOVIE_LISTING: {

          const headers = createTMDBHeaders();

          const result = await fetch(url, { headers, });
          const dataJson = await result.json();

          return {
            success: true,
            response: `${JSON.stringify(dataJson)}`,
          } as ApiResponse;
        }

        default:
          return { success: false, error: 'Route not found' };
      }
    }catch(e){
      return { success: false, error: 'Internal Error' };
    }
  }
}

export const apiService = new ApiService();
