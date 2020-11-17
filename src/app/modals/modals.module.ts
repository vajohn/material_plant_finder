import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRegistrationComponent} from "./customer-registration/customer-registration.component";
import {ResetComponent} from "./reset/reset.component";
import {ApproveComponent} from "./approve/approve.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {AlertComponent} from "./alert/alert.component";
import {ToastComponent} from "./toast/toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPrintModule} from "ngx-print";
import {StewardMaterialModule} from "../material/steward-material.module";
import {MaterialComponentsModule} from "../utilities/material.module";
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

@NgModule({
  entryComponents: [
    ReceiptComponent,
    AlertComponent,
    CustomerRegistrationComponent,
    ApproveComponent,
    ForgotComponent,
    ResetComponent
  ],
  declarations: [
    ReceiptComponent,
    AlertComponent,
    CustomerRegistrationComponent,
    ApproveComponent,
    ForgotComponent,
    ResetComponent,
    ToastComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
    StewardMaterialModule
  ],
  exports: [
    ReceiptComponent,
    AlertComponent,
    CustomerRegistrationComponent,
    ApproveComponent,
    ForgotComponent,
    ResetComponent
  ],
})
export class ModalsModule { }
