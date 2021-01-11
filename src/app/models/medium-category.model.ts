export class MediumCategory {
  highCategoryRoute: string;
  route: string;
  name: string;

  constructor(highCategoryRoute?: string, route?: string, name?: string) {
    this.highCategoryRoute = highCategoryRoute;
    this.route = route;
    this.name = name;
  }
}
