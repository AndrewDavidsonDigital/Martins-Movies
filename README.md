[toc]

## Description

This site is a technical task, see  [Requirements.md](./Requirements.md), bootstrapped from [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and [`TailwindCSS v4`](https://tailwindcss.com/).

## Versions

| Version | Date | Notes |
| ----------- | ----------- | ----------- | 
| `1.0.0` | 2025-08-24 | Task completion and ready for submission |
| `0.2.0` | 2025-08-24 | First pass of completion done, First pass of this readme |
| `0.1.0` | 2025-08-23 | Initial dev from design layout and page structures |
| `0.0.0` | 2025-08-23 | Initial fork from my local NextJS quickstart |


## Build Requirements

| Thing | Version | Reasoning |
| ----------- | ----------- | ----------- | 
| Yarn | 4.9.Y +  | Compilation |
| Node | 22.17.Y +  | Compilation |
| Browser (Chrome) | 126.0.X.Y +  | Runtime |
| Browser (Firefox) | 128.0 +  | Runtime |


## Getting Started

Create your own [.env](.env) file with the following structure:
```bash
NEXT_PUBLIC_TMDB_API_TOKEN={YOUR_KEY_GOES_HERE}
```

First, run the development server:

For a local dev instance:
```bash
# First Run
yarn install && yarn dev

# consecutive runs
yarn boot
```

For a local Build:
```bash
# First Run
yarn install && yarn next build && yarn next serve

# consecutive runs
yarn preview
```

Both instances will be mounted to `port:3000` [http://localhost:3000](http://localhost:3000).

## Usage

As the scope is only for the listings page, that is the only one that really has any content. The other entries are purely to catch all other routes (as there are a bunch in the design) and have those pages, via copy, direct you to the `/movies` route.

## Branding
- Fonts: are defined and loaded via Next, and wired into tailwind within [tailwind-additions.css](/src/style/tailwind-additions.css)
- Colours: The brand colour is defined in [tailwind-additions.css](/src/style/tailwind-additions.css) as `brand` allowing for usage of `text-brand` and `bg-brand/80` etc.
- Name & Logo: as I don't have these assets and that this is purely a proof of competency I have just left these with the ones within the design. These would be swapped out with data pulled either from a CMS or at compile time from a custom `.env` value.

## Features - Included

- Default Movies listing
- Movies Search 
- Movies Filters
- Display as Grid
- Display as List
- External Link out to the movies IMDB page if we know its id.
- Modal to play trailer (as per design), if the api should provide it.
  - Currently hard-coded that the only the 1st displayed movie should 
- Pagination
- Sign-In Form
   - UI Structure only
- Sign-Up Form
   - UI Structure only
- Forgotten Password Form
   - UI Structure only

- Basic Loading states
- Basic Mobile nav


## Features - Excluded
- Mobile Navigation:
  - Mobile Nav is substantially less ideal than where I'd want this to be.
- Login / Sign-in / Sign-up forms:
  - These have no logic or proper state management at the moment as I feel these are out of scope for the task (i.e. these are nav related not listing page related)
- Loading states:
  - these are quite basic at the moment and when the data is readily available (i.e. cached), traversing to a cached one gives a spiky flash which really should not be there. i.e. there should be a minimum display time of say 0.7s on the loading state


## Logic Flow

So to get the data we require to serve the requirements we need to hook into 3 different apis:
- [Discover-Movie](https://developer.themoviedb.org/reference/discover-movie) - This end point is the basic entry point to get a small-detail section of a collection (which is filterable) of movies.
  - This api only ever returns `20` results and as far as I can tell there isn't a way to limit this to 6 to match designs./
  - `Note:` I am trying to keep is as `SFW` as possible by always include the filterStrings `language=en-US&include_adult=false&include_video=false` but not all `NFSW` content / posters and correctly flagged in the db.
    - as of 2025-08-24 the `Default` (non filtered via dropdown content) starts getting ...questionable from page 3, you have been warned / informed ;) 
- [Movie-Details](https://developer.themoviedb.org/reference/movie-details) - This is your standard `getMovieById` end-point where we resolve all our missing data:
  - currently this is `genre details`, `imdb_id`.
- [Keywords-Search](https://developer.themoviedb.org/reference/search-keyword) - This endpoint returns a collection of keyword objects `{ name: string; id: number}` ordered by their relevance / closeness to the string passed to it. (i.e: string hero will return bindings for both "hero", "super hero", and like ~130 more)
  - as passing all of these from our search string to the discovers api is overkill and redundant, the site currently takes up to 5 first (most relevant) bindings and uses those when searching with keywords.

### Filters:
Currently this site supports the following bindings:
- `Default Order` - no extra filtering applied
- `Featured` - sorts by revenue in descending order for current year releases 
  - `sort_by=revenue.desc&primary_release_year=2025`
- `Top Viewed` - sorts by popularity in descending order 
  - `sort_by=popularity.desc`
- `Top Rated` - sorts by vote average in descending order 
  - `sort_by=vote_average.desc`
- `Newest` - sorts by primary release date in descending order 
  - `sort_by=primary_release_date.desc`
- `Oldest` - sorts by primary release date in ascending order 
  - `sort_by=primary_release_date.asc`


## Structure

The project uses a Next.js 14 App Router structure with the following key directories under `src`:

### `/app/`
- **`page.tsx`** - Landing page - no content other than copy directing to `/movies`
- **`[...slug]/`** - Dynamic route handling for all pages other than `/movies`  - no content other than copy directing to `/movies`
- **`layout.tsx`** - Root layout component
- **`globals.ts`** - Global styles and configurations
- **`routes.ts`** - Application routing configuration information - would usually be pulled from a CMS
- **`movies/`** - Movie-specific page for the task itself

### `/components/`
Reusable UI components including:
- **`ButtonElement.tsx`** - Button component
- **`Input.tsx`** - Form input component
- **`Modal.tsx`** - Modal dialog component
- **`ShowCard.tsx`** - Card component for displaying shows/movies
- **`HeroBanner.tsx`** - Hero banner component
- **`icons/`** - SVG icon components (Facebook, Twitter, Instagram, etc.)

### `/contexts/`
React context providers:
- **`MoviesContext.tsx`** - State management for movie data

### `/structure/`
Layout and structural components that should only be used within the `Layout`'s:
- **`Navigation.tsx`** - Main navigation component
- **`Footer.tsx`** - Footer component
- **`PageWrapper.tsx`** - Page layout wrapper
- **`Login.tsx`** - Authentication component

### `/utils/`
Utility functions and helpers:
- **`api.ts`** - API integration functions
- **`cn.ts`** - Class name utility for global registration of `cn` so we aren't importing this on every server component.
- **`interfaces.ts`** - Shared TypeScript interfaces
- **`modal.ts`** - Modal utility functions
- **`string.ts`** - Custom String manipulation methods

### `/style/`
Styling and CSS:
- **`main.css`** - Main stylesheet - Should only be a table-of-contents
- **`custom.css`** - Custom CSS overrides - base css only
- **`tailwind-additions.css`** - Additional Tailwind utilities - our tailwind customisation area.
- **`tailwind-safelist.css`** - Tailwind CSS Safelist - separated file to house all our safelisting rules.

### `/types/`
TypeScript type definitions:
- **`global.d.ts`** - Global type declarations

