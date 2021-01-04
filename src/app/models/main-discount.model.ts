export class MainDiscount {
  constructor(productId: number, storagePath: string) {
    this.productId = productId;
    this.storagePath = storagePath;
  }

  productId: number;
  storagePath: string;
}
