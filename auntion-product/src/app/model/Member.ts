import {Rank} from './Rank';
import {Account} from './Account';

export interface Member {
  idMember: number;
  nameMember: string;
  dateOfBirthMember: number;
  emailMember: string;
  addressMember: string;
  phoneMember: string;
  idCardMember: string;
  paypalMember: string;
  flagDelete: boolean;
  account: Account;
  invoiceList: any;
  point: number;
  paymentList: any;
  rank: Rank;
  cart: any;
  products: any;
}
