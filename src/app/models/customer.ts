import {UsersListResponseBody} from './users';
import {BranchListResponseBody} from './branches';
import {OrganizationResponseBody} from './organization';

export interface CustomerRequest {
  address1: string;
  address2: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationalIdNumber: string;
  sourceOfFunds: string;
  userId: string;
  branchId: string;
}

export interface CustomerListResponse {
  statusCode: number;
  message: string;
  responseBody: CustomerResponseBody[];
}
export interface CustomerResponse {
  statusCode: number;
  message: string;
  responseBody: CustomerResponseBody;
}
export interface CustomerResponseBody {
  id: number;
  firstName: string;
  lastName: string;
  nationalIdNumber: string;
  mobileNumber: string;
  emailAddress: string;
  address1: string;
  address2?: any;
  sourceOfFunds: string;
  dateCreated: string;
  dateUpdated: string;
  user: UsersListResponseBody;
  branch: BranchListResponseBody;
  organization: OrganizationResponseBody;
}
