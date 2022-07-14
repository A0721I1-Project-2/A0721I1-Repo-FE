export interface Payment {
  idPayment: number;
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
  product: any;
}
