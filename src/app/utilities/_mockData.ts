import {RoleModel} from '../models/authentication';

export const organizationsListTest = [
  {
    id: 1,
    companyName: 'STEWARD BANK ZIMBABWE PRIVATE LIMITED',
    tradingName: 'STEWARD BANK',
    companyNumber: '12345/2012',
    physicalAddress: '101 Kwame Nkrumah Avenue, Harare, Zimbabwe',
    emailAddress: 'customerservices@stewardbank.co.zw',
    contactPersonName: 'Courage Mashavave',
    contactPersonMobile: '0772222000',
    organizationLogoUrl: null,
    dateCreated: '2020-02-27T07:46:19.000+0000',
    dateUpdated: '2020-02-27T07:46:19.000+0000'
  },
  {
    id: 2,
    companyName: '1222',
    tradingName: '1232321',
    companyNumber: '1232123',
    physicalAddress: 'asdsad',
    emailAddress: '2222@wewe',
    contactPersonName: '123123',
    contactPersonMobile: '00144154',
    organizationLogoUrl: '',
    dateCreated: '2020-03-04T10:00:07.000+0000',
    dateUpdated: '2020-03-04T10:00:07.000+0000'
  },
  {
    id: 3,
    companyName: '1222',
    tradingName: '1232321',
    companyNumber: '1232123',
    physicalAddress: 'asdsad',
    emailAddress: '2222@wewe',
    contactPersonName: '123123',
    contactPersonMobile: '00144154',
    organizationLogoUrl: '',
    dateCreated: '2020-03-04T10:00:08.000+0000',
    dateUpdated: '2020-03-04T10:00:08.000+0000'
  },
  {
    id: 4,
    companyName: 'Econet Wireless',
    tradingName: 'EWZ',
    companyNumber: 'qwwe',
    physicalAddress: 'No. 2 Old Mutare Road  Msasa Harare, Zimbabwe',
    emailAddress: 'judith.gwande@econet.co.zw',
    contactPersonName: 'Judith Gwande',
    contactPersonMobile: '00144154',
    organizationLogoUrl: '',
    dateCreated: '2020-03-05T07:54:24.000+0000',
    dateUpdated: '2020-03-05T07:54:24.000+0000'
  }
];

export const usersListTest =  [
  {
    id: 1,
    firstName: 'Spencer',
    lastName: 'Chigananda',
    emailAddress: 'spencer.chigananda@stewardbank.co.zw',
    nationalIdNumber: '082020936Q75',
    mobileNumber: '0774399982',
    password: '$2y$12$U03gtttkJx3foVJwzLwBeOfnSzxwCajdRw1h1.gzoFzhGNc2RkQXG',
    hasBeenTrained: true,
    dateCreated: '2020-02-27T09:02:01.000+0000',
    dateUpdated: '2020-03-03T13:42:06.000+0000',
    branch: {
      id: 1,
      name: 'Kwame Nkrumah',
      dateCreated: '2020-02-27T07:47:53.000+0000',
      dateUpdated: '2020-02-27T07:47:53.000+0000',
      organization: {
        id: 1,
        companyName: 'STEWARD BANK ZIMBABWE PRIVATE LIMITED',
        tradingName: 'STEWARD BANK',
        companyNumber: '12345/2012',
        physicalAddress: '101 Kwame Nkrumah Avenue, Harare, Zimbabwe',
        emailAddress: 'customerservices@stewardbank.co.zw',
        contactPersonName: 'Courage Mashavave',
        contactPersonMobile: '0772222000',
        organizationLogoUrl: null,
        dateCreated: '2020-02-27T07:46:19.000+0000',
        dateUpdated: '2020-02-27T07:46:19.000+0000'
      },
      agentCode: 'SBA09483'
    },
    roles: [],
    organization: {
      id: 1,
      companyName: 'STEWARD BANK ZIMBABWE PRIVATE LIMITED',
      tradingName: 'STEWARD BANK',
      companyNumber: '12345/2012',
      physicalAddress: '101 Kwame Nkrumah Avenue, Harare, Zimbabwe',
      emailAddress: 'customerservices@stewardbank.co.zw',
      contactPersonName: 'Courage Mashavave',
      contactPersonMobile: '0772222000',
      organizationLogoUrl: null,
      dateCreated: '2020-02-27T07:46:19.000+0000',
      dateUpdated: '2020-02-27T07:46:19.000+0000'
    },
    hasBeenApproved: true,
    approvedBy: 'Spencer Chigananda',
    active: true
  }
];

export const branchesListTest = [
  {
    id: 1,
    name: 'Kwame Nkrumah',
    dateCreated: '2020-02-27T07:47:53.000+0000',
    dateUpdated: '2020-02-27T07:47:53.000+0000',
    organization: {
      id: 1,
      companyName: 'STEWARD BANK ZIMBABWE PRIVATE LIMITED',
      tradingName: 'STEWARD BANK',
      companyNumber: '12345/2012',
      physicalAddress: '101 Kwame Nkrumah Avenue, Harare, Zimbabwe',
      emailAddress: 'customerservices@stewardbank.co.zw',
      contactPersonName: 'Courage Mashavave',
      contactPersonMobile: '0772222000',
      organizationLogoUrl: null,
      dateCreated: '2020-02-27T07:46:19.000+0000',
      dateUpdated: '2020-02-27T07:46:19.000+0000'
    },
    agentCode: 'SBA09483'
  }
];

export const rolesListTest: RoleModel[] = [{id: 1, name: 'admin'}, {id: 2, name: 'user'}];

export const currencyListTest: RoleModel[] = [{id: 1, name: 'ZWL'}, {id: 2, name: 'USD'}];
