import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ListTransactionComponent } from './list-transaction/list-transaction.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
    declarations: [ListTransactionComponent],
    exports: [
        ListTransactionComponent
    ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule
    ]
})
export class TransactionModule { }
