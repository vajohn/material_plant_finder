import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationsRoutingModule} from './organizations-routing.module';
import {OrgListComponent} from './org-list/org-list.component';
import {OrgAddComponent} from './org-add/org-add.component';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StewardMaterialModule} from '../../material/steward-material.module';


@NgModule({
  declarations: [OrgListComponent, OrgAddComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    StewardMaterialModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class OrganizationsModule {
}
