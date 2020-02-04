import {INavData} from '../models/navigation';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    divider: true
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'fa fa-users',
    children: [
      {
        name: 'Add',
        url: '/users/add',
        icon: 'fas fa-user-edit'
      },
      {
        name: 'List',
        url: '/users/list',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Verifications',
        url: '/users/verifications',
        icon: 'fas fa-user-shield'
      },
    ]
  },
  {
    name: 'Statements',
    url: '/statements',
    icon: 'fas fa-file-invoice-dollar',
    children: [
      {
        name: 'All',
        url: '/list',
        icon: 'fas fa-money-check-alt',
      },
    ]
  },

  {
    name: 'Reports',
    url: '/reports',
    icon: 'fas fa-search-dollar',
    children: [
      {
        name: 'Daily',
        url: '/day',
        icon: 'fas fa-calendar-day'
      },
      {
        name: 'Weekly',
        url: '/notifications/badges',
        icon: 'fas fa-calendar-weekly'
      }
    ]
  },
  {
    name: 'Transactions',
    title: true
  },
  {
    name: 'All transactions',
    url: '/transactions',
    icon: 'fas fa-cash-register'
  },
  {
    name: 'Commissions',
    url: '/commissions',
    icon: 'fas fa-money-bill-wave',
    children: [
      {
        name: 'All',
        url: '/commissions',
        icon: 'fas fa-funnel-dollar'
      },
    ]
  },
  {
    divider: true
  },
  {
    name: 'Accounts',
    title: true,
  },
  {
    name: 'Cash',
    icon: 'fas fa-money-bill',
    url: '/cash',
    children: [
      {
        name: 'View all',
        url: '/notifications/alerts',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Agent deposit',
        url: '/cash/deposit/agent',
        icon: 'fas fa-hand-holding-usd'
      },
      {
        name: 'Withdraw',
        url: '/notifications/alerts',
        icon: 'fas fa-wallet'
      }
    ]
  },
  {
    name: 'Suspense',
    url: '/accounts/suspense',
    icon: 'fas fa-coins',
    children: [
      {
        name: 'View all',
        url: '/notifications/alerts',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Deposit',
        url: '/notifications/alerts',
        icon: 'fas fa-hand-holding-usd'
      },
      {
        name: 'Withdraw',
        url: '/notifications/alerts',
        icon: 'fas fa-wallet'
      }
    ]
  },


];
