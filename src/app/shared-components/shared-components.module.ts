import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import { SelectComponent } from './select/select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CardComponent, SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  exports: [CardComponent, SelectComponent],
})
export class SharedComponentsModule {
}
