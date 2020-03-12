import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import {MaterialComponentsModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListComponent, SearchComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ]
})
export class TablesModule { }
