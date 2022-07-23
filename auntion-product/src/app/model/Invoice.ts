
import {Payment} from './Payment';
import {Member} from './Member';

export interface Invoice {
  idInvoice: number;
  totalPrice: number;
  dateCreated: string;
  idStatusInvoice: boolean;
  flagDelete: boolean;
  member: any;
  invoiceDetailList: any;
  payment: any;
  select: boolean;

}
