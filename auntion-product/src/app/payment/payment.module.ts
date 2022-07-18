import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { InvoicePaymentComponent } from './invoice-payment/invoice-payment.component';
import { InvoiceStatusComponent } from './invoice-status/invoice-status.component';


@NgModule({
  declarations: [InvoicePaymentComponent, InvoiceStatusComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
