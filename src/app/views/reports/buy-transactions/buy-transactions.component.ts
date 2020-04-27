import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReportingService} from "../../../services/reporting.service";
import {TransactionHistoryResponseBody} from "../../../models/transactionHistory";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-buy-transactions',
  templateUrl: './buy-transactions.component.html',
  styleUrls: ['./buy-transactions.component.scss']
})
export class BuyTransactionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['reference','currency',  'amount', 'rateUsed', 'customerFirstName', 'customerLastName', 'organizationName', 'inputterBranch', 'dateCreated', 'dateUpdated'];
  transactionType = [{name: 'Cash', value: 'SWITCH_FROM_CASH'}, {name: 'Account', value: 'SWITCH_TO_ACCOUNT'}];
  dataSource: MatTableDataSource<TransactionHistoryResponseBody>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private reportingService: ReportingService) {
    this.dataSource = new MatTableDataSource([]);
    this.getTableData();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private getTableData() {
    this.reportingService.getAllTransactionHistory()
      .subscribe(result => this.dataSource.data = result);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  moreInfo(row: any) {
    console.log(row);
  }

  byTransaction($event: MatSelectChange) {
    this.reportingService.getAllTransactionHistoryByTransactionType($event.value)
      .subscribe(result => this.dataSource.data = result);
  }
}
