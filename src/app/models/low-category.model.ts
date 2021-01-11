export class LowCategory {
  mediumCategoryRoute: string;
  route: string;
  name: string;

  constructor(mediumCategoryRoute?: string, route?: string, name?: string) {
    this.mediumCategoryRoute = mediumCategoryRoute;
    this.route = route;
    this.name = name;
  }
}
