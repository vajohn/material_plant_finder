import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {AuthenticationService} from '../../../services/authentication.service';
import {OrganizationsService} from '../../../services/organizations.service';
import {OrganizationResponseBody} from '../../../models/organization';
import {RoleModel, UserDetails} from '../../../models/authentication';
import {BranchListResponseBody} from '../../../models/branches';
import {BranchesService} from '../../../services/branches.service';
import {LoginService} from '../../../services/login.service';
import {RolesService} from '../../../services/roles.service';
import {AlertService} from "../../../modals/alert/alert.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  organizations: OrganizationResponseBody[] = [];
  roles: RoleModel[] = [];
  branches: BranchListResponseBody[] = [];
  user: UserDetails;
  userForm: FormGroup;
  submitted = false;
  orgId = 1;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    private formBuilder: FormBuilder,
    public as: AuthenticationService,
    private toast: AlertService,
    public organizationsService: OrganizationsService,
    private bs: BranchesService,
    private rolesService: RolesService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.user = this.loginService.currentUserInfoValue;
    this.setFormFields();
    this.getFormData();
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
    this.orgId = this.f.orgId.value;

    this.bs.getBranchesByOrg(this.orgId).subscribe(d => this.branches = d.responseBody);
  }

  onRoleSelect($event: any) {

  }

  private setFormFields(): void {
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
  }

  private getFormData(): void {
    if (this.user.userInfo.roles[0].admin) {

      this.rolesService.getSpecificRoles('admin-roles').subscribe(adminRoles => this.roles.push(...adminRoles.responseBody));
      this.rolesService.getSpecificRoles('bank-roles').subscribe(bankRoles =>  this.roles.push(...bankRoles.responseBody));
      this.organizations = [this.user.userInfo.organization];
      this.branches = [this.user.userInfo.branch];

    }

    if (this.user.userInfo.roles[0].bank) {
      this.rolesService.getSpecificRoles().subscribe(agentRoles =>  this.roles = agentRoles.responseBody);
      this.organizationsService.getForUserForm()
        .subscribe(response => {
          this.organizations = response[0].responseBody;
          this.branches = response[1].responseBody;
        });
    }

  }
}
