export class Product {
  lowestCategoryId: string;
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  picturesPath: string;

  constructor(
    lowestCategoryId?: string,
    id?: string,
    name?: string,
    price?: number,
    oldPrice?: number,
    picturesPath?: string
  ) {
    this.lowestCategoryId = lowestCategoryId;
    this.id = id;
    this.name = name;
    this.price = price;
    this.oldPrice = oldPrice;
    this.picturesPath = picturesPath;
  }
}
