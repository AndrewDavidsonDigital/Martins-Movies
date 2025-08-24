import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NEXT_PUBLIC_TMDB_API_TOKEN = 'test-token'

// Mock fetch globally for API tests
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>

// Mock console methods to reduce noise in tests
const originalConsole = { ...console }
global.console = {
  ...originalConsole,
  warn: jest.fn(),
  error: jest.fn(),
}
