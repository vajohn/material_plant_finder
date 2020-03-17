import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {OrganizationsService} from '../../../services/organizations.service';
import {OrganizationListResponse} from '../../../models/organization';
import {RoleModel, RoleListResponse} from '../../../models/authentication';
import {branchesListTest, organizationsListTest, rolesListTest} from '../../../utilities/_mockData';
import {BranchListResponseBody} from '../../../models/branches';
import {BranchesService} from '../../../services/branches.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  organizations = [];
  roles: RoleModel[] = [];
  userForm: FormGroup;
  submitted = false;
  orgId = 1;
  branches: BranchListResponseBody[] = [];
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    private formBuilder: FormBuilder,
    public as: AuthenticationService,
    private toast: ToastrService,
    public os: OrganizationsService,
    private bs: BranchesService
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      hasBeenTrained: [false, Validators.required],
      lastName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      nationalIdNumber: ['', Validators.required],
      branchId: [''],
      roleId: [''],
      orgId: ['']
    });
    // this.organizations = organizationsListTest;
    // this.branches = branchesListTest;
    // this.roles = rolesListTest;

    this.os.getForUserForm().subscribe(responseList => {
      this.organizations = responseList[0].responseBody;
      this.branches = responseList[1].responseBody;
      this.roles = responseList[2].responseBody;
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.as.registerUser(this.userForm.value, this.f.branchId.value, this.f.roleId.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

  onOrganizationSelect($event: any) {
    console.log(this.f.orgId.value);
    this.orgId = this.f.orgId.value;

    this.bs.getBranchesByOrg(this.orgId).subscribe(d => this.branches = d.responseBody);
  }

  onRoleSelect($event: any) {

  }
}
