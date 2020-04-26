import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserFormComponent} from './user-form/user-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StewardMaterialModule} from '../../material/steward-material.module';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {MaterialComponentsModule} from "../../utilities/material.module";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [UserFormComponent, UserListComponent, CustomerListComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        StewardMaterialModule,
        MaterialComponentsModule,
        DirectivesModule
    ]
})
export class UsersModule {
}
