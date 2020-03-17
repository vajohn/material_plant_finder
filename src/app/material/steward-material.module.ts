import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {HeaderComponent} from './header/header.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {FooterComponent} from './footer/footer.component';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';
import {TooltipDirective} from './tooltip/tooltip.directive';
import {TooltipComponent} from './tooltip/tooltip.component';
import {MaterialComponentsModule} from '../material.module';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    InputComponent,
    TableComponent,
    TooltipComponent,
    DropdownComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        MaterialComponentsModule
    ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    InputComponent,
    TableComponent,
    TooltipComponent
  ],

})
export class StewardMaterialModule {
}
