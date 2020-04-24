import {BranchListResponseBody} from './branches';
import {OrganizationResponseBody} from './organization';
import {RoleModel} from './authentication';

export interface UsersListResponse {
  statusCode: number;
  message: string;
  responseBody: UsersListResponseBody[];
}

export interface ApproveUserResponse {
  statusCode: number;
  message: string;
  responseBody: string;
}

export interface UsersResponse {
  statusCode: number;
  message: string;
  responseBody: UsersListResponseBody;
}
export interface UsersListResponseBody {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  nationalIdNumber: string;
  mobileNumber: string;
  password: string;
  hasBeenTrained: boolean;
  dateCreated: string;
  dateUpdated: string;
  branch: BranchListResponseBody;
  roles: RoleModel[];
  organization: OrganizationResponseBody;
  hasBeenApproved: boolean;
  approvedBy?: string;
  active: boolean;
}
