import {OrganizationResponseBody} from './organization';

export interface BranchListResponse {
  statusCode: number;
  message: string;
  responseBody: BranchListResponseBody[];
}

export interface BranchListResponseBody {
  id: number;
  name: string;
  dateCreated: string;
  dateUpdated: string;
  organization: OrganizationResponseBody;
  agentCode: string;
}
