import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoicePaymentComponent} from './invoice-payment/invoice-payment.component';


const routes: Routes = [
  {
    path: 'invoice',
    component: InvoicePaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
