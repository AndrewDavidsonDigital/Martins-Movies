import { describe, it, expect, jest } from '@jest/globals'
import { resolveRouteFromPath, resolveRoutePath } from './routes'
import { IRoute } from './interfaces'

// Mock the routes module
jest.mock('@/app/routes', () => ({
  staticRoutes: [
    { name: 'Home', path: '/', alias: 'home' },
    { name: 'Movies', path: '/movies', alias: 'movies' },
    { name: 'About', path: '/about', alias: 'about' },
    { name: 'Contact', path: '/contact', alias: 'contact' }
  ]
}))

describe('Routes utility functions', () => {
  describe('resolveRouteFromPath', () => {
    it('should resolve Home route by name', () => {
      const result = resolveRouteFromPath('Home')
      
      expect(result).toEqual({ name: 'Home', path: '/', alias: 'home' })
    })

    it('should resolve route by path', () => {
      const result = resolveRouteFromPath('/movies')
      
      expect(result).toEqual({ name: 'Movies', path: '/movies', alias: 'movies' })
    })

    it('should return undefined for path with trailing slash (exact match required)', () => {
      const result = resolveRouteFromPath('/about/')
      
      expect(result).toBeUndefined()
    })

    it('should return undefined for non-existent path', () => {
      const result = resolveRouteFromPath('/non-existent')
      
      expect(result).toBeUndefined()
    })

    it('should return undefined for empty path', () => {
      const result = resolveRouteFromPath('')
      
      expect(result).toBeUndefined()
    })

    it('should handle root path', () => {
      const result = resolveRouteFromPath('/')
      
      expect(result).toEqual({ name: 'Home', path: '/', alias: 'home' })
    })
  })

  describe('resolveRoutePath', () => {
    it('should return Home for Home route', () => {
      const homeRoute: IRoute = { name: 'Home', path: '/' }
      const result = resolveRoutePath(homeRoute)
      
      expect(result).toEqual(['Home'])
    })

    it('should resolve simple path', () => {
      const moviesRoute: IRoute = { name: 'Movies', path: '/movies' }
      const result = resolveRoutePath(moviesRoute)
      
      expect(result).toEqual(['Home', 'movies'])
    })

    it('should resolve nested path', () => {
      const nestedRoute: IRoute = { name: 'Nested', path: '/movies/action/2024' }
      const result = resolveRoutePath(nestedRoute)
      
      expect(result).toEqual(['Home', 'movies', 'action', '2024'])
    })

    it('should handle path with multiple segments', () => {
      const multiSegmentRoute: IRoute = { name: 'Multi', path: '/category/subcategory/item' }
      const result = resolveRoutePath(multiSegmentRoute)
      
      expect(result).toEqual(['Home', 'category', 'subcategory', 'item'])
    })

    it('should handle path with single segment', () => {
      const singleSegmentRoute: IRoute = { name: 'Single', path: '/about' }
      const result = resolveRoutePath(singleSegmentRoute)
      
      expect(result).toEqual(['Home', 'about'])
    })

    it('should handle route with alias', () => {
      const aliasedRoute: IRoute = { name: 'Contact', path: '/contact', alias: 'contact' }
      const result = resolveRoutePath(aliasedRoute)
      
      expect(result).toEqual(['Home', 'contact'])
    })
  })

  describe('Edge cases', () => {
    it('should handle route with empty path', () => {
      const emptyPathRoute: IRoute = { name: 'Empty', path: '' }
      const result = resolveRoutePath(emptyPathRoute)
      
      expect(result).toEqual(['Home'])
    })

    it('should handle route with just slash path (splits into empty string)', () => {
      const slashPathRoute: IRoute = { name: 'Slash', path: '/' }
      const result = resolveRoutePath(slashPathRoute)
      
      expect(result).toEqual(['Home', ''])
    })

    it('should handle route with multiple consecutive slashes', () => {
      const multiSlashRoute: IRoute = { name: 'MultiSlash', path: '//movies//action' }
      const result = resolveRoutePath(multiSlashRoute)
      
      expect(result).toEqual(['Home', '', 'movies', '', 'action'])
    })
  })
})
