export class LowestCategory {
  lowCategoryRoute: string;
  route: string;
  name: string;

  constructor(lowCategoryRoute?: string, route?: string, name?: string) {
    this.lowCategoryRoute = lowCategoryRoute;
    this.route = route;
    this.name = name;
  }
}
