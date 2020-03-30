import {INavData} from '../models/navigation';

export const navItems: INavData[] = [
  {
    name: 'Buy',
    url: '/cash',
    icon: 'fa fa-users',
    children: [
      {
        name: 'Cash',
        url: '/buy/cash',
        icon: 'fas fa-user-edit'
      },
      {
        name: 'Steward account',
        url: '/buy/steward',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Ecocash',
        url: '/buy/ecocash',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Other account',
        url: '/buy/account',
        icon: 'fas fa-address-book'
      }
    ]
  },
  {
    name: 'Sell',
    url: '/account',
    icon: 'fas fa-file-invoice-dollar',
    children: [
      {
        name: 'Cash',
        url: '/sell/cash',
        icon: 'fas fa-user-edit'
      },
      {
        name: 'Steward account',
        url: '/sell/steward',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Ecocash',
        url: '/sell/ecocash',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Other account',
        url: '/sell/account',
        icon: 'fas fa-address-book'
      }
    ]
  },
  {
    name: 'Organizations',
    url: '/organization',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/organization/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/organization/form',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },

  {
    name: 'Branches',
    url: '/branches',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/branches/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/branches/form',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All users',
        url: '/users/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/users/form',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'All customers',
        url: '/users/customers',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];

export const adminNavigationList: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All users',
        url: '/users/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/users/form',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];

export const guestNavigationList: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All users',
        url: '/users/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'All customers',
        url: '/users/customers',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];

export const bankNavigationList: INavData[] = [
  {
    name: 'Organizations',
    url: '/organization',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/organization/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/organization/form',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
  {
    name: 'Branches',
    url: '/branches',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/branches/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/branches/form',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All users',
        url: '/users/list',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'Add new',
        url: '/users/form',
        icon: 'fas fa-funnel-dollar'
      },
      {
        name: 'All customers',
        url: '/users/customers',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];

export const agentNavigationList: INavData[] = [
  {
    name: 'Buy',
    url: '/cash',
    icon: 'fa fa-users',
    children: [
      {
        name: 'Cash',
        url: '/buy/cash',
        icon: 'fas fa-user-edit'
      },
      {
        name: 'Steward account',
        url: '/buy/steward',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Ecocash',
        url: '/buy/ecocash',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Other account',
        url: '/buy/account',
        icon: 'fas fa-address-book'
      }
    ]
  },
  {
    name: 'Sell',
    url: '/account',
    icon: 'fas fa-file-invoice-dollar',
    children: [
      {
        name: 'Cash',
        url: '/sell/cash',
        icon: 'fas fa-user-edit'
      },
      {
        name: 'Steward account',
        url: '/sell/steward',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Ecocash',
        url: '/sell/ecocash',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Other account',
        url: '/sell/account',
        icon: 'fas fa-address-book'
      }
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All customers',
        url: '/users/customers',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];
