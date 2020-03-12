import { MaterialComponentsModule } from './../material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class NavigationModule { }
