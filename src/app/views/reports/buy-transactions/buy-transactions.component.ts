import { Component, OnInit } from '@angular/core';
import {ReportingService} from "../../../services/reporting.service";

@Component({
  selector: 'app-buy-transactions',
  templateUrl: './buy-transactions.component.html',
  styleUrls: ['./buy-transactions.component.scss']
})
export class BuyTransactionsComponent implements OnInit {

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
  }

}
