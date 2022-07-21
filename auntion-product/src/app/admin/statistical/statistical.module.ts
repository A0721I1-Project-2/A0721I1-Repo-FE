import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalPageComponent } from './statistical-page/statistical-page.component';
import {AdminModule} from "../admin.module";


@NgModule({
  declarations: [StatisticalPageComponent],
    imports: [
        CommonModule,
        StatisticalRoutingModule,
        AdminModule
    ]
})
export class StatisticalModule { }
