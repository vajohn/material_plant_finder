import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
})
export class MaterialComponentsModule {
}
