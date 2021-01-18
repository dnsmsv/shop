export class Order {
  constructor(userEmail: string, productId: string) {
    this.userEmail = userEmail;
    this.productId = productId;
  }

  userEmail: string;
  productId: string;
  key: string;
  count: number = 0;
}
