import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrgListComponent} from './org-list/org-list.component';
import {OrgAddComponent} from './org-add/org-add.component';
import {P404Component} from '../errors/p404/p404.component';

const routes: Routes = [
  {
    path: 'list',
    component: OrgListComponent,
    data: {
      allowedRoles: ['BANK_SUPERVISOR', 'BANK_MANAGER']
    }
  },
  {
    path: 'form',
    component: OrgAddComponent,
    data: {
      allowedRoles: ['BANK_CAPTURER']
    }
  },
  {
    path: '**',
    component: P404Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {
}
