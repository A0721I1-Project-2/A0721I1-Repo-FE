export interface Payment {
  idPayment: number;
  fullNameReceiver: string;
  addressReceiver: string;
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
