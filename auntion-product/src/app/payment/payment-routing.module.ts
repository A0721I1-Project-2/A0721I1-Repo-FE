import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoicePaymentComponent} from './invoice-payment/invoice-payment.component';
import {InvoiceStatusComponent} from './invoice-status/invoice-status.component';


const routes: Routes = [
  {
    path: 'invoice',
    component: InvoicePaymentComponent
  },
  {
    path: 'invoice-status',
    component: InvoiceStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
