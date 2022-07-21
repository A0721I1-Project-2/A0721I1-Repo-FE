export interface Product {
  idProduct: number;
  codeProduct: string;
  nameProduct: string;
  initialPrice: number;
  finalPrice: number;
  incrementPrice: number;
  productDescription: string;
  startDate: string;
  endDate: string;
  remainingTime: string;
  createDay: string;
  flagDelete: boolean;
  typeProduct: any;
  approvalStatus: any;
  biddingStatus: any;
  imageProductList: any;
  mainPhoto: string; // HauLST
  invoiceDetailList: any;
  cart: any;
  members: any;
  member: any;
}
