import { IRoute } from "@/utils/interfaces";

export const staticRoutes: Array<IRoute> = [
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
