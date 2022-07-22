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
<<<<<<< HEAD
  imageProductList: any[];
=======
  imageProductList: any;
  mainPhoto: string; // HauLST
>>>>>>> 52516eb1ca37b9e414e598bb404dfb0694fa3196
  invoiceDetailList: any;
  cart: any;
  members: any;
}
