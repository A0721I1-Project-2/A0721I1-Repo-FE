
import {Invoice} from './Invoice';
import {Product} from './Product';

export interface InvoiceDetail {
  idInvoiceDetail: number;
  invoice: Invoice;
  product: Product;

}
