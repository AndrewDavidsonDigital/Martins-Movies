## Arcadian Digital - Martin's Movies Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.17+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/) [![Yarn](https://img.shields.io/badge/Yarn-4.9+-2C8EBB?style=for-the-badge&logo=yarn)](https://yarnpkg.com/)

A modern movie discovery platform built with Next.js 14, Tailwind CSS v4, and TypeScript. This project demonstrates a complete movie listing application with search, filtering, and responsive design capabilities.


### 📋 Table of Contents

- [TLDR](#TLDR)
- [Quick Start](#quick-start)
- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Version History](#version-history)

## TLDR:
Known Good with Yarn 4.9+ and Node 22.17+ on windows, in Chrome and FF. 

⚠️ Some of the more recent movie entries are not properly tagged for Adult content and will start showing up from page-3 on the default search. Nothing too raunchy but is worth noting before use.

Some of the logic in the [discovers api (search)](https://developer.themoviedb.org/reference/discover-movie) seems a bit off:
- purely looking at page-3 and page-4 we can see that id `611251` is both last in page-3 and first in page-4. Just food for thought as this was tested on their api-sandbox so is not something in this code-base being weird.

### 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd ArcadianDigital
yarn install

# Set up environment
cp .env.example .env
# Edit .env with your TMDB API token

# Start development server
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 📖 Description

This site is a technical task, see [Requirements.md](./Requirements.md), bootstrapped from [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and [`TailwindCSS v4`](https://tailwindcss.com/).

### ✨ Features

### ✅ Included Features
- **Movie Discovery**: Browse movies with pagination
- **Advanced Search**: Search movies by title and keywords
- **Smart Filtering**: Multiple filter options (Featured, Top Rated, Newest, etc.)
- **Responsive Design**: Grid and List view modes, [List View Design](https://gnodesign.com/templates/movify/movie-list.htm)
- **External Links**: Direct links to IMDB pages
- **Trailer Modal**: Video player for movie trailers
- **Authentication UI**: Sign-in, Sign-up, and Password reset forms
- **Mobile Navigation**: Responsive mobile menu
- **Loading States**: User feedback during data fetching

### 🔄 Planned Enhancements
- **Improved Loading States**: Minimum display time to prevent flashing
- **Modal Refactoring**: Centralized video modal for listing
- **Modal Refactoring 2**: Login / nav modals need a transition clean up.
- **Mobile Pagination**: Mobile pagination as a whole needs a design re-factor as it doesn't really fit and visually feels forced.
- **Better Mobile Navigation**: Enhanced mobile experience
- **Contextual Scroll-to-Top**: Button should only be visible when we are not already at the top.
- **Critical CSS**: Performance optimizations
- **Component Test Coverage**: UI and E2E testing or component library

### ❌ Excluded Features
- Critical CSS / Splash Screen
- Authentication logic
- Footer/Header content management

### 🛠️ Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| **Yarn** | 4.9+ | Package management and compilation |
| **Node.js** | 22.17+ | Runtime environment |
| **Chrome** | 126.0+ | Primary browser support |
| **Firefox** | 128.0+ | Secondary browser support |

### 🚀 Installation

### 1. Environment Setup

Create a `.env` file in the project root:

```bash
# TMDB API Bearer Token (not API key)
NEXT_PUBLIC_TMDB_API_TOKEN=your_bearer_token_here
```

### 2. Development

```bash
# First time setup
yarn install && yarn dev

# Subsequent runs
yarn boot
```

### 3. Production Build

```bash
# First time build
yarn install && yarn next build && yarn next start

# Subsequent runs
yarn preview
```

Both instances run on [http://localhost:3000](http://localhost:3000).

### 📱 Usage

The application focuses on the movie listings page (`/movies`). Other routes direct the users to the main movie discovery interface.

### View Modes
- **Grid View**: Default card-based layout
- **List View**: Compact list layout with movie details

### Filtering Options
- **Default**: No additional filtering
- **Featured**: Current year releases by revenue
- **Top Viewed**: By popularity
- **Top Rated**: By vote average
- **Newest**: By release date (descending)
- **Oldest**: By release date (ascending)

### 🔌 API Integration

The application integrates with The Movie Database (TMDB) API through three main endpoints:

### 1. **Discover Movies** (`/discover/movie`)
- Returns 20 movies per page
- Supports filtering and sorting
- Includes adult content filtering for SFW experience - effectiveness of this is open for debate.

### 2. **Movie Details** (`/movie/{id}`)
- Retrieves comprehensive movie information
- Provides genre details and IMDB IDs

### 3. **Keyword Search** (`/search/keyword`)
- Enables intelligent search functionality
- Returns relevant keyword bindings for enhanced search

### ⚠️ API Limitations
- Some recent movies may not be properly tagged for adult content
- Page 3+ may contain content requiring discretion
- API pagination behavior may show duplicate entries across pages

### 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── movies/            # Movie listing page
│   ├── [...slug]/         # Dynamic route handling
│   └── layout.tsx         # Root layout
├── components/             # Reusable UI components
│   ├── icons/             # SVG icon library
│   ├── ButtonElement.tsx  # Button component
│   ├── ShowCard.tsx       # Movie card component
│   └── Modal.tsx          # Modal dialog
├── contexts/               # React context providers
│   └── MoviesContext.tsx  # Movie state management
├── structure/              # Layout components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Footer component
│   └── PageWrapper.tsx    # Page layout wrapper
├── utils/                  # Utility functions
│   ├── api.ts             # API integration
│   ├── interfaces.ts      # TypeScript interfaces
│   └── string.ts          # String utilities
├── style/                  # Styling and CSS
│   ├── tailwind-additions.css  # Custom Tailwind utilities
│   └── main.css           # Main stylesheet
└── types/                  # TypeScript definitions
    └── global.d.ts        # Global type declarations
```

### 🎨 Branding & Styling

- **Fonts**: Loaded via Next.js and integrated with Tailwind
- **Colors**: Brand color defined as `brand` in Tailwind utilities
- **Customization**: Extensible through `tailwind-additions.css`
- **Responsive**: Mobile-first design approach

### ⚠️ Known Issues

1. **Content Filtering**: Some movies from page 3+ may contain adult content
2. **Loading States**: Brief flashing when navigating to cached content
3. **Modal Management**: Each card has its own modal instance (planned refactor)
4. **API Pagination**: Duplicate entries may appear across page boundaries

### 📅 Version History

| Version | Date | Description |
|---------|------|-------------|
| `1.0.0` | 2025-08-24 | Task completion and ready for submission |
| `0.2.0` | 2025-08-24 | First pass of completion and README |
| `0.1.0` | 2025-08-23 | Initial development and page structures |
| `0.0.0` | 2025-08-23 | Initial fork from NextJS quickstart |


### 📄 License

This project is created for technical assessment purposes. Please refer to the project requirements for usage guidelines.

