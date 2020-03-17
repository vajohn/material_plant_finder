import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ReceiptService} from '../../containers/receipt/receipt.service';
import {MatDialog} from '@angular/material/dialog';
import {ReceiptComponent} from '../../containers/receipt/receipt.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {

  }

  check() {

    const dialogRef = this.dialog.open(ReceiptComponent, {
      // width: '250px',
      data: {name: 'this.name', animal: 'this.animal'}
    });
  }
}
