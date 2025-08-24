export interface IRoute {
  name: string;
  alias?: string;
  path: string;
}


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

export function resolveRouteFromPath(path: string): IRoute| undefined {
  if (path === "Home") return staticRoutes.find(el => el.name === "Home");

  return staticRoutes.find(el => el.path === path);
}
export function resolveRoutePath(currentRoute: IRoute): Array<string> {
  if (currentRoute.name === "Home") return ['Home'];
  
  const retval: Array<string> = currentRoute.path.split("/");
  retval[0] = "Home";

  return retval;
}