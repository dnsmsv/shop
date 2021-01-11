export class Product {
  lowestCategoryRoute: string;
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  picturesPath: string;
  picturesCount: number = 0;

  constructor(
    lowestCategoryRoute?: string,
    id?: string,
    name?: string,
    price?: number,
    oldPrice?: number,
    picturesCount?: number
  ) {
    this.lowestCategoryRoute = lowestCategoryRoute;
    this.id = id;
    this.name = name;
    this.price = price;
    this.oldPrice = oldPrice;
    this.picturesPath = `/products/${id}/`;
    this.picturesCount = picturesCount;
  }
}
