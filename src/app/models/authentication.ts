import {UsersListResponseBody} from './users';

export interface UserRegistrationRequest {
  emailAddress: string;
  firstName: string;
  hasBeenTrained: boolean;
  lastName: string;
  mobileNumber: string;
  nationalIdNumber: string;
}

export interface CustomerRegistrationRequest {
  address1: string;
  address2: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationalIdNumber: string;
  sourceOfFunds: string;
}

export interface OrganizationRegistrationRequest {
  companyName: string;
  companyNumber: string;
  contactPersonMobile: string;
  contactPersonName: string;
  emailAddress: string;
  organizationLogoUrl: string;
  physicalAddress: string;
  tradingName: string;
}

export interface BranchRegistrationRequest {
  name: string;
}

export interface LoginRequest {
  nationalIdNumber: string;
  password: string;
}

export interface JWTResponse {
  userId: number;
  role: RoleModel[];
  exp: number;
}

export interface UserDetails {
  orgId: number;
  branchId: number;
  userInfo: UsersListResponseBody;
}

export interface RoleListResponse {
  statusCode: number;
  message: string;
  responseBody: RoleModel[];
}

export interface RoleModel {
  id: number;
  name: string;
}
