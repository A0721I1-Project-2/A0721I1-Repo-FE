

export class ImageProduct {
  id: number;
  imageProduct: string;
  product?: any;

  constructor(imageProduct: string , product?: any) {
    this.imageProduct = imageProduct;
    this.product = product;
  }
}
