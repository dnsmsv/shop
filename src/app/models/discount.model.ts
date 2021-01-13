export class Discount {
  constructor(productId: string) {
    this.productId = productId;
  }

  productId: string;

  get picturePath(): string {
    return `discounts/${this.productId}.png`;
  }
}
