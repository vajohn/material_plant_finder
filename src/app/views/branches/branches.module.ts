import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { BranchAllComponent } from './branch-all/branch-all.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {StewardMaterialModule} from '../../material/steward-material.module';
import {BranchAccountComponent} from "./branch-account/branch-account.component";
import {MaterialComponentsModule} from "../../utilities/material.module";


@NgModule({
  declarations: [
    BranchFormComponent,
    BranchAllComponent,
    BranchAccountComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    StewardMaterialModule,
    MaterialComponentsModule
  ]
})
export class BranchesModule { }
