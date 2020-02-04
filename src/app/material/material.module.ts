import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent, SideMenuComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports:  [ButtonComponent, HeaderComponent, SideMenuComponent, FooterComponent],

})
export class MaterialModule { }
