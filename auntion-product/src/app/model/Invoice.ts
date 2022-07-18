import {Payment} from './Payment';
import {Member} from './Member';

export interface Invoice {
  idInvoice: number;
  totalPrice: number;
  dateCreated: string;
  idStatusInvoice: boolean;
  flagDelete: boolean;
  member: Member;
  invoiceDetailList: any;
  payment: Payment;
  select: boolean;
}
