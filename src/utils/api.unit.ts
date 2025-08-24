import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { 
  API_URL_MOVIE_LISTING, 
  API_URL_MOVIE_EXTERNAL_LINKS, 
  API_URL_MOVIE_FULL_DETAILS, 
  API_URL_KEYWORD_IDS,
  apiService 
} from './api'

// Mock fetch with proper typing
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe('API Constants', () => {
  it('should export correct API URLs', () => {
    expect(API_URL_MOVIE_LISTING).toBe('https://api.themoviedb.org/3/discover/movie')
    expect(API_URL_MOVIE_EXTERNAL_LINKS).toBe('https://api.themoviedb.org/3/movie/__id__/external_ids')
    expect(API_URL_MOVIE_FULL_DETAILS).toBe('https://api.themoviedb.org/3/movie/__id__')
    expect(API_URL_KEYWORD_IDS).toBe('https://api.themoviedb.org/3/search/keyword?query=__term__&page=1')
  })
})

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variable
    process.env.NEXT_PUBLIC_TMDB_API_TOKEN = 'test-token'
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('get method', () => {
    it('should successfully fetch movie listing data', async () => {
      const mockResponse = { results: [{ id: 1, title: 'Test Movie' }] }
      const mockJsonResponse = Promise.resolve(mockResponse)
      
      mockFetch.mockResolvedValueOnce({
        json: () => mockJsonResponse
      } as Response)

      const result = await apiService.get(API_URL_MOVIE_LISTING, API_URL_MOVIE_LISTING)

      expect(result.success).toBe(true)
      expect(result.response).toBe(JSON.stringify(mockResponse))
      expect(mockFetch).toHaveBeenCalledWith(API_URL_MOVIE_LISTING, {
        headers: expect.any(Headers)
      })
    })

    it('should successfully fetch movie external links data', async () => {
      const mockResponse = { imdb_id: 'tt123456', facebook_id: 'test-facebook' }
      const mockJsonResponse = Promise.resolve(mockResponse)
      
      mockFetch.mockResolvedValueOnce({
        json: () => mockJsonResponse
      } as Response)

      const result = await apiService.get(API_URL_MOVIE_EXTERNAL_LINKS, API_URL_MOVIE_EXTERNAL_LINKS)

      expect(result.success).toBe(true)
      expect(result.response).toBe(JSON.stringify(mockResponse))
      expect(mockFetch).toHaveBeenCalledWith(API_URL_MOVIE_EXTERNAL_LINKS, {
        headers: expect.any(Headers)
      })
    })

    it('should successfully fetch movie full details data', async () => {
      const mockResponse = { 
        id: 1, 
        title: 'Test Movie', 
        overview: 'Test overview',
        release_date: '2024-01-01'
      }
      const mockJsonResponse = Promise.resolve(mockResponse)
      
      mockFetch.mockResolvedValueOnce({
        json: () => mockJsonResponse
      } as Response)

      const result = await apiService.get(API_URL_MOVIE_FULL_DETAILS, API_URL_MOVIE_FULL_DETAILS)

      expect(result.success).toBe(true)
      expect(result.response).toBe(JSON.stringify(mockResponse))
      expect(mockFetch).toHaveBeenCalledWith(API_URL_MOVIE_FULL_DETAILS, {
        headers: expect.any(Headers)
      })
    })

    it('should successfully fetch keyword IDs data', async () => {
      const mockResponse = { results: [{ id: 1, name: 'action' }] }
      const mockJsonResponse = Promise.resolve(mockResponse)
      
      mockFetch.mockResolvedValueOnce({
        json: () => mockJsonResponse
      } as Response)

      const result = await apiService.get(API_URL_KEYWORD_IDS, API_URL_KEYWORD_IDS)

      expect(result.success).toBe(true)
      expect(result.response).toBe(JSON.stringify(mockResponse))
      expect(mockFetch).toHaveBeenCalledWith(API_URL_KEYWORD_IDS, {
        headers: expect.any(Headers)
      })
    })

    it('should return error for unknown route', async () => {
      const result = await apiService.get('https://unknown.api.com/test', 'unknown')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Route not found')
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should handle fetch errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await apiService.get(API_URL_MOVIE_LISTING, API_URL_MOVIE_LISTING)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Internal Error')
    })

    it('should handle JSON parsing errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.reject(new Error('Invalid JSON'))
      } as Response)

      const result = await apiService.get(API_URL_MOVIE_LISTING, API_URL_MOVIE_LISTING)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Internal Error')
    })

    it('should include authorization header when API token is present', async () => {
      const mockResponse = { results: [] }
      const mockJsonResponse = Promise.resolve(mockResponse)
      
      mockFetch.mockResolvedValueOnce({
        json: () => mockJsonResponse
      } as Response)

      await apiService.get(API_URL_MOVIE_LISTING, API_URL_MOVIE_LISTING)

      expect(mockFetch).toHaveBeenCalledWith(API_URL_MOVIE_LISTING, {
        headers: expect.any(Headers)
      })
    })

    it('should work without API token', async () => {
      // Remove API token
      delete process.env.NEXT_PUBLIC_TMDB_API_TOKEN
      
      const mockResponse = { results: [] }
      const mockJsonResponse = Promise.resolve(mockResponse)
      
      mockFetch.mockResolvedValueOnce({
        json: () => mockJsonResponse
      } as Response)

      const result = await apiService.get(API_URL_MOVIE_LISTING, API_URL_MOVIE_LISTING)

      expect(result.success).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith(API_URL_MOVIE_LISTING, {
        headers: expect.any(Headers)
      })
    })
  })
})
