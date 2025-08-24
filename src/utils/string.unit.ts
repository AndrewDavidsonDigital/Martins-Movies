import { describe, it, expect } from '@jest/globals'
import { getYouTubeEmbedUrl } from './string'

describe('getYouTubeEmbedUrl', () => {
  describe('Standard watch URLs', () => {
    it('should convert standard YouTube watch URL to embed URL', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle watch URLs with additional parameters', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s&feature=share'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle watch URLs with multiple parameters', () => {
      const input = 'https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ&t=30s'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })

  describe('Short URLs', () => {
    it('should convert youtu.be short URL to embed URL', () => {
      const input = 'https://youtu.be/dQw4w9WgXcQ'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle youtu.be URLs with additional parameters', () => {
      const input = 'https://youtu.be/dQw4w9WgXcQ?t=30s'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })

  describe('Embed URLs', () => {
    it('should return embed URL unchanged if already in embed format', () => {
      const input = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle embed URLs with additional parameters', () => {
      const input = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })

  describe('Legacy v URLs', () => {
    it('should convert legacy v URL to embed URL', () => {
      const input = 'https://www.youtube.com/v/dQw4w9WgXcQ'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle legacy v URLs with additional parameters', () => {
      const input = 'https://www.youtube.com/v/dQw4w9WgXcQ?fs=1'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })

  describe('Edge cases', () => {
    it('should handle URLs with newlines', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ\n'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle URLs with question marks in video ID', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ?'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle URLs with hash fragments', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ#section'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle URLs with ampersands in video ID', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })

  describe('Unsupported URLs', () => {
    it('should return original URL for non-YouTube URLs', () => {
      const input = 'https://vimeo.com/123456789'
      const expected = 'https://vimeo.com/123456789'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should return original URL for invalid YouTube URLs', () => {
      const input = 'https://www.youtube.com/invalid/path'
      const expected = 'https://www.youtube.com/invalid/path'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should return original URL for malformed URLs', () => {
      const input = 'not-a-url'
      const expected = 'not-a-url'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should return original URL for empty string', () => {
      const input = ''
      const expected = ''
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })

  describe('Video ID variations', () => {
    it('should handle short video IDs', () => {
      const input = 'https://www.youtube.com/watch?v=abc123'
      const expected = 'https://www.youtube.com/embed/abc123'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle long video IDs', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ123456789'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ123456789'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })

    it('should handle video IDs with special characters', () => {
      const input = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ-123_456'
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ-123_456'
      
      expect(getYouTubeEmbedUrl(input)).toBe(expected)
    })
  })
})
