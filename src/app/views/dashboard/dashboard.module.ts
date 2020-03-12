import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {StewardMaterialModule} from '../../material/steward-material.module';



@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule, StewardMaterialModule, DashboardRoutingModule, SharedComponentsModule
    ]
})
export class DashboardModule { }
