export interface Payment {
  idPayment: number;
  fullNameReceiver: string;
  addressReceiver: string;
  city: string;
  district: string;
  ward: string;
  emailReceiver: string;
  phoneReceiver: string;
  feeService: number;
  descriptionReceiver: string;
  member: any;
  paymentMethod: any;
  transport: any;
  cart: any;
  invoiceList: any;
}
