import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { BranchAllComponent } from './branch-all/branch-all.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {StewardMaterialModule} from '../../material/steward-material.module';


@NgModule({
  declarations: [BranchFormComponent, BranchAllComponent],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    StewardMaterialModule
  ]
})
export class BranchesModule { }
