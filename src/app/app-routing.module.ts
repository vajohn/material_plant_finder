import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { P404Component } from './p404/p404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tables' },
  { path: 'tables', loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule) },
  { path: 'forms', loadChildren: () => import('./views/forms/forms.module').then(m => m.FormsModule) },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
