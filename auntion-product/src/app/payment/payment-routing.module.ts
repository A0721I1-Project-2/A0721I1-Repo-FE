import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoicePaymentComponent} from './invoice-payment/invoice-payment.component';
import {PaymentCartComponent} from './payment-cart/payment-cart.component';


const routes: Routes = [
  {
    path: 'invoice',
    component: InvoicePaymentComponent
  },
  {
    path: 'payment-cart',
    component: PaymentCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
