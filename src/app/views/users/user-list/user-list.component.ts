import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { OrganizationResponseBody} from '../../../models/organization';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {OrganizationsService} from '../../../services/organizations.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {UsersService} from '../../../services/users.service';
import {UsersListResponse, UsersListResponseBody} from '../../../models/users';
import {LoginService} from '../../../services/login.service';
import {MatDialog} from '@angular/material/dialog';
import {UserDetails} from '../../../models/authentication';
import {ApproveComponent} from "../../../modals/approve/approve.component";
import {AlertService} from "../../../modals/alert/alert.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  organization: OrganizationResponseBody[] = [];
  user: UserDetails;
  displayedColumns: string[] = ['firstName', 'lastName', 'roles[0].name','organization.companyName', 'branch.name', 'hasBeenApproved'];
  dataSource: MatTableDataSource<UsersListResponseBody>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public organizationsService: OrganizationsService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private loginService: LoginService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.user = this.loginService.currentUserInfoValue;
    this.dataSource = new MatTableDataSource([]);
    this.getUsers();
    this.initFilter();
    this.initSort();
  }

  private getUsers() {
    this.usersService.getAllUsers()
      .subscribe(result => this.dataSource.data = result.responseBody);
    this.organizationsService.getAllOrganizations()
      .subscribe(result => this.organization = result.responseBody);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  approveUser(userData: UsersListResponseBody) {
    const dialogRef = this.dialog.open(ApproveComponent, {
      width: '250px',
      data: {statement: 'approve user'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.approveUser(userData.id, this.loginService.currentUserInfoValue.userInfo.id, userData).subscribe(d => {
          this.alertService
            .show({title: d.message, description: d.responseBody, style: 'success'});
          this.usersService.getAllUsers()
            .subscribe(result => this.dataSource.data = result.responseBody);
        });
      }
    });

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
      return data.organization.companyName.toLowerCase().includes(filter)
        || data.branch.name.toLowerCase().includes(filter)
        || data.roles[0].name.toLowerCase().includes(filter);
    };
  }

  private initSort() {
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch(property) {
        case 'organization.companyName': return data.organization.companyName;
        case 'branch.name': return data.branch.name;
        case 'roles[0].name': return data.roles[0].name;
        default: return data[property];
      }
    };
  }

  byOrganization($event: MatSelectChange) {
    this.usersService.getUsersByOrg($event.value)
      .subscribe(result => this.dataSource.data = result.responseBody);
  }
}
