import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {P404Component} from "../errors/p404/p404.component";
import {LoginSessionsComponent} from "./login-sessions/login-sessions.component";
import {BuyTransactionsComponent} from "./buy-transactions/buy-transactions.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginSessionsComponent,
    data: {
      allowedRoles: ['BANK_SUPERVISOR', 'BANK_MANAGER', 'ADMIN_SUPERVISOR', 'GUEST']
    }
  },
  {
    path: 'buy',
    component: BuyTransactionsComponent,
    data: {
      allowedRoles: ['BANK_SUPERVISOR', 'BANK_MANAGER', 'ADMIN_SUPERVISOR', 'GUEST']
    }
  },
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
