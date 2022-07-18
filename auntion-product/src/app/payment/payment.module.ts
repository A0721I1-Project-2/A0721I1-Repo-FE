import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { InvoicePaymentComponent } from './invoice-payment/invoice-payment.component';


@NgModule({
  declarations: [InvoicePaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
