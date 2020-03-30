import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {P404Component} from '../errors/p404/p404.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {BankGuard} from '../../guards/bank.guard';
import {AdminGuard} from '../../guards/admin.guard';
import {AgentGuard} from '../../guards/agent.guard';

const routes: Routes = [
  {path: 'list', component: UserListComponent},
  {path: 'form', component: UserFormComponent,  canActivate: [BankGuard, AdminGuard]},
  {path: 'customers', component: CustomerListComponent, canActivate: [BankGuard, AgentGuard]},
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
