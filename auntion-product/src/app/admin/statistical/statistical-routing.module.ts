import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticalPageComponent} from "./statistical-page/statistical-page.component";


const routes: Routes = [
  {path: '' , component: StatisticalPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
