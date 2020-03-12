import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRegistrationComponent } from '../../containers/customer-registration/customer-registration.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';

@NgModule({
  entryComponents: [],
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule,
    SharedComponentsModule
  ],
  exports: [],

})
export class ModalsModule { }
