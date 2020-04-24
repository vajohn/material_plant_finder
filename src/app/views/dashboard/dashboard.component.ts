import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {transactionListTest} from "../../utilities/_mockData";
import {ChartsModel} from "../../models/charts";
import {AlertService} from "../../modals/alert/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactionsChart: any[];
  view: any[] = [600, 500];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Transaction Type';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Transactions';
  legendTitle: string = 'Status';

  colorScheme = {
    domain: ['#5AA454', 'red', '#AAAAAA']
  };

  constructor(public router: Router, public dialog: MatDialog, private alertService: AlertService,) {
    // Object.assign(this, {transactionsChart})
  }

  ngOnInit() {
    this.transactionsChart = this.check();
  }

  check(): ChartsModel[] {
    //
    const data = transactionListTest;
    const success = 'SUCCESS';
    const fail = 'FAILED';
    let cashSuccess = 0;
    let cashFail = 0;
    let accountSuccess = 0;
    let accountFail = 0;

    data.forEach( d => {
      if(d.transactionType === 'SWITCH_FROM_CASH'){
        if (d.transactionStatus === success){
          cashSuccess+=1;
        }
        if (d.transactionStatus === fail){
          cashFail+=1;
        }
      }

      if(d.transactionType === 'SWITCH_TO_ACCOUNT'){
        if (d.transactionStatus === success){
          accountSuccess+=1;
        }
        if (d.transactionStatus === fail){
          accountFail+=1;
        }
      }
    });

    return [
      {
        name: "SWITCH_TO_ACCOUNT",
        series: [
          {
            name: "SUCCESS",
            value: accountSuccess
          },
          {
            name: "FAILED",
            value: accountFail
          }
        ]
      },

      {
        name: "SWITCH_FROM_CASH",
        series: [
          {
            name: "SUCCESS",
            value: cashSuccess
          },
          {
            name: "FAILED",
            value: cashFail
          }
        ]
      },

    ];
  }

  open() {
    this.alertService.show({title: 'Warning Title', description: 'this is the full blown message', style: 'warning'});
  }
}
