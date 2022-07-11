export interface Invoice {
  idInvoice: number;
  totalPrice: number;
  dateCreated: string;
  idStatusInvoice: boolean;
  flagDelete: boolean;
  member: any;
  invoiceDetailList: any;
  payment: any;
}
