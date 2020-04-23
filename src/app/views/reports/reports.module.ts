import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import {MaterialComponentsModule} from "../../utilities/material.module";
import { LoginSessionsComponent } from './login-sessions/login-sessions.component';
import { BuyTransactionsComponent } from './buy-transactions/buy-transactions.component';


@NgModule({
  declarations: [LoginSessionsComponent, BuyTransactionsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialComponentsModule
  ]
})
export class ReportsModule { }
