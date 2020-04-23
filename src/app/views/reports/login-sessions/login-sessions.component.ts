import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReportingService} from "../../../services/reporting.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserLogin} from "../../../models/reports";

@Component({
  selector: 'app-login-sessions',
  templateUrl: './login-sessions.component.html',
  styleUrls: ['./login-sessions.component.scss']
})
export class LoginSessionsComponent implements OnInit,  AfterViewInit {
  displayedColumns: string[] = ['date', 'user.firstName', 'user.lastName', 'user.organization.companyName', 'user.branch.name', 'roles[0].name'];
  dataSource: MatTableDataSource<UserLogin>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([]);
    this.getTableData();
    this.initFilter();
    this.initSort();
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private getTableData() {
    this.reportingService.getLoginSessions()
      .subscribe(result => this.dataSource.data = result);
  }
  moreInfo(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initFilter() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.user.firstName.toLowerCase().includes(filter)
        || data.user.lastName.toLowerCase().includes(filter)
        || data.user.branch.name.toLowerCase().includes(filter)
        || data.user.organization.companyName.toLowerCase().includes(filter)
        || data.user.roles[0].name.toLowerCase().includes(filter);
    };
 }

  private initSort() {
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch(property) {
        case 'date': return data.date;
        case 'user.firstName': return data.user.firstName;
        default: return data[property];
      }
    };
  }
}
