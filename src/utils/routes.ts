import { staticRoutes } from "@/app/routes";
import { IRoute } from "./interfaces";

export function resolveRouteFromPath(path: string): IRoute| undefined {
  if (path === "Home") return staticRoutes.find(el => el.name === "Home");

  return staticRoutes.find(el => el.path === path);
}
export function resolveRoutePath(currentRoute: IRoute): string[] {
  if (currentRoute.name === "Home") return ['Home'];
  
  const retval: string[] = currentRoute.path.split("/");
  retval[0] = "Home";

  return retval;
}