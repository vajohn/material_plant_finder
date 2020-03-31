import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BranchAllComponent} from './branch-all/branch-all.component';
import {BranchFormComponent} from './branch-form/branch-form.component';
import {P404Component} from "../errors/p404/p404.component";

const routes: Routes = [

  {
    path: 'list',
    component: BranchAllComponent,
    data: {
      allowedRoles: ['BANK_MANAGER', 'BANK_SUPERVISOR', 'AGENT_MANAGER']
    }
  },
  {
    path: 'form',
    component: BranchFormComponent,
    data: {
      allowedRoles: ['BANK_CAPTURER']
    }
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
