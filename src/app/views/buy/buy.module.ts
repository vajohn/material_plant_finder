import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BuyRoutingModule} from './buy-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {CashBuyComponent} from './cash/cash-buy.component';
import {StewardBuyComponent} from './steward/steward-buy.component';
import {StewardMaterialModule} from '../../material/steward-material.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MaterialComponentsModule} from "../../utilities/material.module";

@NgModule({
  declarations: [CashBuyComponent, StewardBuyComponent],
    imports: [
        CommonModule,
        BuyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        StewardMaterialModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MaterialComponentsModule
    ]
})
export class BuyModule { }
