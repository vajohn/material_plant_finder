import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {P404Component} from '../errors/p404/p404.component';
import {CashBuyComponent} from './cash/cash-buy.component';
import {StewardBuyComponent} from './steward/steward-buy.component';

const routes: Routes = [
  {
    path: 'cash',
    component: CashBuyComponent,
    data: {
      allowedRoles: ['AGENT_CAPTURER']
    }
  },
  {
    path: 'steward',
    component: StewardBuyComponent,
    data: {
      allowedRoles: ['AGENT_CAPTURER']
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
export class BuyRoutingModule { }
