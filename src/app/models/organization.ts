export interface OrganizationResponse {
  statusCode: number;
  message: string;
  responseBody: OrganizationResponseBody;
}

export interface OrganizationListResponse {
  statusCode: number;
  message: string;
  responseBody: OrganizationResponseBody[];
}

export interface OrganizationResponseBody {
  id: number;
  companyName: string;
  tradingName: string;
  companyNumber: string;
  physicalAddress: string;
  emailAddress: string;
  contactPersonName: string;
  contactPersonMobile: string;
  organizationLogoUrl?: string;
  dateCreated: string;
  dateUpdated: string;
}
