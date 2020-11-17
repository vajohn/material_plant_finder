import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertModel} from "../../models/alert";
import {AlertComponent} from "./alert.component";
import {ConfirmPasswordComponent} from "../confirm-password/confirm-password.component";
import {CustomerResponseBody} from "../../models/customer";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  show(data:AlertModel ){
    const dialogRef = this.dialog.open(AlertComponent, {
      position: {top: `2.5em`},
      data: data,
      hasBackdrop: false,
      panelClass: 'ios-alert'
    });

    setInterval(() => dialogRef.close(), 5000)
  }

  showConfirmation(userData: CustomerResponseBody, transactionData = {} ): MatDialogRef<ConfirmPasswordComponent, any>{
    return this.dialog.open(ConfirmPasswordComponent, {
      data: { user: userData, transaction: transactionData },
    });
  }
}
