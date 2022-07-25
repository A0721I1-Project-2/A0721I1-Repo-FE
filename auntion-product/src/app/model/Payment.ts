export interface Payment {
  idPayment: number;
  fullNameReceiver: string;
  firstNameReceiver: string;
  lastNameReceiver: string;
  city: string;
  district: string;
  ward: string;
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

  product: any;
  total:any;
}
