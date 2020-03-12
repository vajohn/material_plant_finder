import { AddNewComponent } from './../form/add-new/add-new.component';
import { P404Component } from './../../p404/p404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add' },
  {path: 'add', component: AddNewComponent},
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
