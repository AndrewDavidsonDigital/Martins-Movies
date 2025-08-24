## Brief 
`Martin's Movies` is a client who reviews movies online. They have moved all of their movies to an online movie database which is only accessible via an API.
 
They need to:
- build a new paginated listing page to pull all data from their new database
- allow customers to search by different movie attributes which are:
     - Keyword
- mark a movie as 'watched' so when they open the listing page again in the same browser it will still be marked as 'watched'
 
`Martin's Movies` would like to link the Read More button for each movie off to the IMDB page if the imdb_id is set for a movie.
 
He would like the design to match a theme he liked but make all make all links a dead link (eg `<a href="#">x</a>`) for now:
 
https://gnodesign.com/templates/movify/movie-grid3.html (feel free to put a centered search bar just above the listing for search)
 
#### Deliverables
- a ReactJS/NextJS App broken up as you see fit (languages isn't too important so TS is fine too)
 
We are using The Movie Database which is located here:
 
https://developers.themoviedb.org/3/getting-started/introduction
 
You can sign up for a free account to get an API key.


## Clarifications

##### Generic:
I'm assuming the Design / Theme they "Like" is the one linked later in the brief
 - gnodesign - movie-grid3 `Arcadian:` Correct

##### Design: Doesn't have a read more button, 
 - As such I'm assuming we would be technically repurposing the `details` button for this purpose, as  scope is for just a listings page (i.e. no details page.) 
   - `Arcadian:` Correct, no details page required

##### Requirement Gap:
 - The requirement for the `Read More` button indicates that it should only navigate off to IMDB if said id exists. 
   - `Arcadian:` Correct again
 - In the case where said ID doesn't exist, are you fine with either the button being hidden or navigating to a `local` details route for the movie (empty / sparse on detail)
   - `Arcadian:` Hidden would be great.

##### Requirements conflict?
 - There is a requirement to link the `Read More` button out to the appropriate IMDB page, but then followed by the requirement to dead-end all links.
   - `Arcadian:` Good pickup, just linking out to IMDB if it exists would be great. So just change 'Details' to 'Read More' as you mentioned above in the 'Design: Doesn't have a read more button' 
 - Should these also be left as dead-links or should these flow out, or should these just do something temporarily to display (alert / log / toast) info about the IMDB destination that it would have navigated to.
   - `Arcadian:` As above, just hide them if there is no ID.

##### Deliverable:
 - Is just sharing the resulting GitHub repo fine for this or would you prefer a Vercel mounted site or something else entirely? 
   - `Arcadian:` Repo is fine, we can run it locally. Just let us know if we need a .env or similar with an API key if required.