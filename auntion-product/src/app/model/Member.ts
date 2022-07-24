import {Rank} from './Rank';
import {Account} from './Account';

export interface Member {
  idMember: number;
  nameMember: string;
  dateOfBirthMember: number;
  emailMember: string;
  addressMember: string;
  city: string;
  district: string;
  ward: string;
  phoneMember: string;
  idCardMember: string;
  paypalMember: string;
  flagDelete: boolean;
  account: any;
  invoiceList: any;
  point: number;
  paymentList: any;
  rank: any;
  cart: any;
  products: any;
  checkedClause: boolean;
}
