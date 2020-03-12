import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BranchAllComponent} from './branch-all/branch-all.component';
import {BranchFormComponent} from './branch-form/branch-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: BranchAllComponent},
  {path: 'form', component: BranchFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
