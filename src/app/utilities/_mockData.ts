import {RoleModel} from '../models/authentication';
import {CurrencyModel, ExchangeRate} from '../models/currency';

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

export const currencyListTest: CurrencyModel[] = [{id: 1, name: 'ZWL', isoCode: 1}, {id: 2, name: 'USD', isoCode: 2}];

export const exchangeRateListTest: ExchangeRate[] =  [
  {
    currency: 'AED',
    ccyname: 'United A',
    buyrate: '0.1937',
    sellrate: '0.2056'
  },
  {
    currency: 'BWP',
    ccyname: 'Botswana Pula',
    buyrate: '1.5687',
    sellrate: '1.6658'
  },
  {
    currency: 'EUR',
    ccyname: 'Euro',
    buyrate: '19.9418',
    sellrate: '21.1754'
  },
  {
    currency: 'USF',
    ccyname: 'US Dollar',
    buyrate: '17.8466',
    sellrate: '18.9506'
  },
  {
    currency: 'AUD',
    ccyname: 'Australian Dollars',
    buyrate: '11.2238',
    sellrate: '11.9180'
  },
  {
    currency: 'CHF',
    ccyname: 'Swiss Franc',
    buyrate: '0.0498',
    sellrate: '0.0529'
  },
  {
    currency: 'CNY',
    ccyname: 'China Yuan Renminbi',
    buyrate: '0.3686',
    sellrate: '0.3914'
  },
  {
    currency: 'INR',
    ccyname: 'Indian Rupee',
    buyrate: '3.8990',
    sellrate: '4.1402'
  },
  {
    currency: 'ZAR',
    ccyname: 'South African Rand',
    buyrate: '0.8655',
    sellrate: '0.9191'
  },
  {
    currency: 'CAD',
    ccyname: 'Canadian Dollar',
    buyrate: '0.0730',
    sellrate: '0.0776'
  },
  {
    currency: 'GBP',
    ccyname: 'Pound Sterling',
    buyrate: '22.4243',
    sellrate: '23.8114'
  },
  {
    currency: 'JPY',
    ccyname: 'Japanese Yen',
    buyrate: '5.5800',
    sellrate: '5.9300'
  },
  {
    currency: 'USD',
    ccyname: 'US Dollar',
    buyrate: '17.8466',
    sellrate: '18.9506'
  },
  {
    currency: 'XAG',
    ccyname: 'SILVER in Ounces',
    buyrate: '1.0000',
    sellrate: '1.0000'
  },
  {
    currency: 'XAU',
    ccyname: 'Gold in Ounces',
    buyrate: '1.0000',
    sellrate: '1.0000'
  },
  {
    currency: 'ZWL',
    ccyname: 'RTGS DOLLAR',
    buyrate: '1.0000',
    sellrate: '1.0000'
  },
  {
    currency: 'ARS',
    ccyname: 'Argentine Peso',
    buyrate: '4.1500',
    sellrate: '4.2500'
  },
  {
    currency: 'CZK',
    ccyname: 'Czech Koruna',
    buyrate: '1.0000',
    sellrate: '1.0000'
  },
  {
    currency: 'DKK',
    ccyname: 'Danish Krone',
    buyrate: '5.7300',
    sellrate: '5.7400'
  },
  {
    currency: 'HKD',
    ccyname: 'Hong Kong Dollar',
    buyrate: '7.7995',
    sellrate: '7.8005'
  },
  {
    currency: 'HRK',
    ccyname: 'Croatian Kuna',
    buyrate: '1.0000',
    sellrate: '1.0000'
  },
  {
    currency: 'KWD',
    ccyname: 'Kuwait Dinars',
    buyrate: '0.2910',
    sellrate: '0.2930'
  },
  {
    currency: 'LBP',
    ccyname: 'Lebanese Pounds',
    buyrate: '1509.0000',
    sellrate: '1519.0000'
  },
  {
    currency: 'LKR',
    ccyname: 'Sri Lankan Rupee',
    buyrate: '99.0000',
    sellrate: '100.0000'
  },
  {
    currency: 'NPR',
    ccyname: 'Nepali Rupee',
    buyrate: '69.6160',
    sellrate: '69.6320'
  },
  {
    currency: 'NZD',
    ccyname: 'New Zealand Dollars',
    buyrate: '1.2346',
    sellrate: '1.3333'
  },
  {
    currency: 'PHP',
    ccyname: 'Philippines Pesos',
    buyrate: '43.0200',
    sellrate: '43.1900'
  },
  {
    currency: 'PLN',
    ccyname: 'Polish Zloty',
    buyrate: '3.3200',
    sellrate: '3.3300'
  },
  {
    currency: 'SAR',
    ccyname: 'Saudi Arabia Riyals',
    buyrate: '3.7400',
    sellrate: '3.7600'
  },
  {
    currency: 'SEK',
    ccyname: 'Swedish Krone',
    buyrate: '7.1350',
    sellrate: '7.1360'
  },
  {
    currency: 'SGD',
    ccyname: 'Singapore Dollars',
    buyrate: '1.2600',
    sellrate: '1.2700'
  },
  {
    currency: 'THB',
    ccyname: 'Thailand Baht',
    buyrate: '39.4500',
    sellrate: '39.4700'
  },
  {
    currency: 'TWD',
    ccyname: 'Taiwan New Dollars',
    buyrate: '28.9000',
    sellrate: '29.0000'
  }
];
