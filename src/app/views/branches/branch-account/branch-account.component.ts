import { Component, OnInit } from '@angular/core';
import {OrganizationResponseBody} from "../../../models/organization";
import {BranchListResponseBody} from "../../../models/branches";
import {OrganizationsService} from "../../../services/organizations.service";
import {AccountsService} from "../../../services/accounts.service";
import {BranchesService} from "../../../services/branches.service";
import {AccountType} from "../../../models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {CurrencyModel} from "../../../models/currency";
import {CurrenciesService} from "../../../services/currencies.service";

@Component({
  selector: 'app-branch-account',
  templateUrl: './branch-account.component.html',
  styleUrls: ['./branch-account.component.scss']
})
export class BranchAccountComponent implements OnInit {

  branchAccountForm: FormGroup;
  submitted = false;
  public organizations: OrganizationResponseBody[] = [];
  public branches: BranchListResponseBody[] = [];
  public accountTypes: AccountType[] = [];
  public currencies: CurrencyModel[] = [];

  constructor(
    private organizationsService: OrganizationsService,
    private accountsService: AccountsService,
    private branchesService: BranchesService,
    private formBuilder: FormBuilder,
    private currenciesService: CurrenciesService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.initiateForm();
  }

  private getData() {
    this.organizationsService.getAllOrganizations()
      .subscribe(response => this.organizations = response.responseBody);
    this.accountsService.getAccountTypes()
      .subscribe(response => this.accountTypes = response);
    this.currenciesService.getCurrencies()
      .subscribe(response => this.currencies = response.responseBody);
  }

  private initiateForm() {
    this.branchAccountForm = this.formBuilder.group({
      orgId: ['', Validators.required],
      branchId: ['', Validators.required],
      currencyId: ['', Validators.required],
      typeId: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      shortCode: ['', Validators.required]
    });
  }

  public onOrganizationSelected($event: MatSelectChange) {
    this.branchesService.getBranchesByOrg($event.value)
      .subscribe(response => this.branches = response.responseBody);
  }

  get form(){
    return this.branchAccountForm.controls;
  }

  public initiateAddBranch(){
    this.submitted = true;

    if(this.branchAccountForm.invalid){
      return;
    }

    this.accountsService.addAccount(this.branchAccountForm.value).subscribe();
  }


}
