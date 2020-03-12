import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BuyRoutingModule} from './buy-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {CashBuyComponent} from './cash/cash-buy.component';
import {StewardBuyComponent} from './steward/steward-buy.component';
import {StewardMaterialModule} from '../../material/steward-material.module';

@NgModule({
  declarations: [CashBuyComponent, StewardBuyComponent],
  imports: [
    CommonModule,
    BuyRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    StewardMaterialModule
  ]
})
export class BuyModule { }
