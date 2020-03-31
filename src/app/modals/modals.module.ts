import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRegistrationComponent} from "./customer-registration/customer-registration.component";
import {ResetComponent} from "./reset/reset.component";
import {ApproveComponent} from "./approve/approve.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {AlertComponent} from "./alert/alert.component";
import {ToastComponent} from "./toast/toast.component";
import {MaterialComponentsModule} from "../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPrintModule} from "ngx-print";
import {StewardMaterialModule} from "../material/steward-material.module";

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
    ToastComponent
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
