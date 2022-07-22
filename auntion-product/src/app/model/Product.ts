import {Member} from './Member';
import {ApprovalStatus} from './ApprovalStatus';
import {BiddingStatus} from './BiddingStatus';
import {ImageProduct} from './ImageProduct';
import {TypeProduct} from './TypeProduct';

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
  typeProduct: TypeProduct;
  approvalStatus: ApprovalStatus;
  biddingStatus: BiddingStatus;
  imageProductList: ImageProduct;
  mainPhoto: string; // HauLST
  invoiceDetailList: any;
  cart: any;
  members: Member;
}
