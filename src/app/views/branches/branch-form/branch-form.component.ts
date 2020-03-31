import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {AuthenticationService} from '../../../services/authentication.service';
import {OrganizationListResponse, OrganizationResponseBody} from '../../../models/organization';
import {OrganizationsService} from '../../../services/organizations.service';
import {AlertService} from "../../../modals/alert/alert.service";

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {
  branchForm: FormGroup;
  submitted = false;
  organizations: OrganizationResponseBody[] = [];
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.alertService);

  constructor(
    private formBuilder: FormBuilder,
    private as: AuthenticationService,
    public os: OrganizationsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.os.getAllOrganizations().subscribe((d: OrganizationListResponse) => this.organizations = d.responseBody);

    this.branchForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      agentCode: ['', [Validators.required, Validators.minLength(4)]],
      orgId: [''],
    });
  }

  get f() {
    return this.branchForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.branchForm.invalid) {
      return;
    }
    const branchId = this.f.orgId.value;
    const copy = { ... this.branchForm.value };
    delete copy.orgId;

    this.as.registerBranch(copy, branchId).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

}
