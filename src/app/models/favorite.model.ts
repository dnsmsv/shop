export class Favorite {
  constructor(userEmail: string, productId: string) {
    this.userEmail = userEmail;
    this.productId = productId;
  }

  userEmail: string;
  productId: string;
  key: string;
}
