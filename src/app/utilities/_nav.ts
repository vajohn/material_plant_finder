import {INavData} from '../models/navigation';

export const adminSupervisorNavigationList: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
    children: [
      {
        name: 'All users',
        url: '/users/list',
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
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
      },
    ]
  },
];
export const adminNavigationList: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
    children: [
      {
        name: 'Add new',
        url: '/users/form',
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
      },
    ]
  },
];

export const guestNavigationList: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
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
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];

export const bankNavigationManager: INavData[] = [
  {
    name: 'Organizations',
    url: '/organization',
    icon: 'organization',
    children: [
      {
        name: 'All',
        url: '/organization/list',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Branches',
    url: '/branches',
    icon: 'branches',
    children: [
      {
        name: 'All',
        url: '/branches/list',
        icon: 'fas fa-funnel-dollar'
      }
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
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
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];
export const bankNavigationSupervisor: INavData[] = [
  {
    name: 'Organizations',
    url: '/organization',
    icon: 'organization',
    children: [
      {
        name: 'All',
        url: '/organization/list',
      }
    ]
  },
  {
    name: 'Branches',
    url: '/branches',
    icon: 'branches',
    children: [
      {
        name: 'All',
        url: '/branches/list',
      }
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
    children: [
      {
        name: 'All customers',
        url: '/users/customers',
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];
export const bankNavigationCapture: INavData[] = [
  {
    name: 'Organizations',
    url: '/organization',
    icon: 'organization',
    children: [
      {
        name: 'Add organization',
        url: '/organization/form',
      },
    ]
  },
  {
    name: 'Branches',
    url: '/branches',
    icon: 'branches',
    children: [
      {
        name: 'Add branch',
        url: '/branches/form',
      },
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
    children: [
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
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];

export const agentNavigationManager: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
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
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];
export const agentNavigationSupervisor: INavData[] = [
  {
    name: 'Users',
    url: '/users',
    icon: 'users',
    children: [
      {
        name: 'All customers',
        url: '/users/customers',
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'reports',
    children: [
      {
        name: 'All',
        url: '/reports/list',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
];
export const agentNavigationCapture: INavData[] = [
  {
    name: 'Buy',
    url: '/cash',
    icon: 'buy',
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
    icon: 'sell',
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
  }
];
