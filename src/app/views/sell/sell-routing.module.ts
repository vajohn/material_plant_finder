import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {P404Component} from '../errors/p404/p404.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }
