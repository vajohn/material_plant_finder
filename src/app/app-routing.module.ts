import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './containers/default-layout';
import {LoginComponent} from './views/authentication/login/login.component';
import {P500Component} from './views/errors/p500/p500.component';
import {P404Component} from './views/errors/p404/p404.component';
import {BaseGuard} from './guards/base.guard';
import {AgentGuard} from "./guards/agent.guard";
import {GuestGuard} from "./guards/guest.guard";
import {BankGuard} from "./guards/bank.guard";
import {AdminGuard} from "./guards/admin.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '404',
    component: P404Component,

  },
  {
    path: '500',
    component: P500Component,
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [BaseGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'buy',
        canActivate: [AgentGuard],
        loadChildren: () => import('./views/buy/buy.module').then(m => m.BuyModule)
      },
      {
        path: 'sell',
        canActivate: [AgentGuard],
        loadChildren: () => import('./views/sell/sell.module').then(m => m.SellModule)
      },
      {
        path: 'organization',
        canActivate: [BankGuard],
        loadChildren: () => import('./views/organizations/organizations.module').then(m => m.OrganizationsModule)
      },
      {
        path: 'branches',
        canActivate: [BankGuard],
        loadChildren: () => import('./views/branches/branches.module').then(m => m.BranchesModule)
      },
      {
        path: 'users',
        canActivate: [BankGuard, AdminGuard, GuestGuard],
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'reports',
        canActivate: [BankGuard, AdminGuard, GuestGuard],
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
    ]
  },
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
