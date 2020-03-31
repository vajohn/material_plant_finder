import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {P404Component} from '../errors/p404/p404.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {CustomerListComponent} from './customer-list/customer-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
    data: {
      allowedRoles: ['BANK_SUPERVISOR', 'ADMIN_SUPERVISOR']
    }
  },
  {
    path: 'form',
    component: UserFormComponent,
    data: {
      allowedRoles: ['BANK_CAPTURER', 'ADMIN_CAPTURER']
    }
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    data: {
      allowedRoles: [
        'BANK_SUPERVISOR',
        'BANK_CAPTURER',
        'AGENT_MANAGER',
        'GUEST'
      ]
    }
  },
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
