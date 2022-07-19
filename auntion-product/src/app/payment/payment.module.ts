import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { InvoicePaymentComponent } from './invoice-payment/invoice-payment.component';
import { PaymentCartComponent } from './payment-cart/payment-cart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [InvoicePaymentComponent, PaymentCartComponent],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PaymentModule { }
