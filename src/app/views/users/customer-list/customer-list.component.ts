import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {CustomerResponseBody} from '../../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: CustomerResponseBody[] = [];
  displayedColumns = ['firstName', 'lastName',  'organization.companyName', 'branch.name', 'user.firstName' , 'user.lastName'];
  displayedHeaders = ['First name', 'Surname', 'Organization', 'Branch', 'On-boarder first name', 'On-boarder surname'];
  constructor(private cs: CustomerService) {
  }

  ngOnInit(): void {
    this.cs.getAllCustomers().subscribe(response =>
      this.customers = response.responseBody
    );
  }

}
