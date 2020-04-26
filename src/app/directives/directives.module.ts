import { NgModule } from '@angular/core';
import {UpperCaseInputDirective} from "./upper-case-input.directive";

@NgModule({
  declarations: [UpperCaseInputDirective],
  exports: [
    UpperCaseInputDirective
  ]
})
export class DirectivesModule { }
