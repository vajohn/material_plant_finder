import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertModel} from "../../models/alert";
import {AlertComponent} from "./alert.component";


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
}
