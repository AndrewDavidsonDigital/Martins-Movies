import { IRoute } from "@/utils/interfaces";

export const staticRoutes: IRoute[] = [
  {
    name: 'Home',
    path: '',
    alias: '/',
  },
  {
    name: 'Movies',
    path: '/movies',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
  {
    name: 'Contact-Us',
    path: '/contact-us',
  },
]
