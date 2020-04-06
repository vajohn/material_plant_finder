import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NationalIdMaskPipe } from './national-id-mask.pipe';



@NgModule({
  declarations: [NationalIdMaskPipe],
  imports: [
    CommonModule
  ]
})
export class CommonPipesModule { }
