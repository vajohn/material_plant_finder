import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {StewardMaterialModule} from '../../material/steward-material.module';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    StewardMaterialModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    MatDialogModule,
    NgxChartsModule,
    MatCardModule
  ]
})
export class DashboardModule {
}
