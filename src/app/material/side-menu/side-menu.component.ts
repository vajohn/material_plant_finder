import {Component, OnInit} from '@angular/core';
import {
  adminNavigationList,
  adminSupervisorNavigationList,
  agentNavigationCapture,
  agentNavigationManager,
  agentNavigationSupervisor,
  bankNavigationCapture,
  bankNavigationManager,
  bankNavigationSupervisor,
  guestNavigationList
} from 'src/app/utilities/_nav';
import {INavData} from "../../models/navigation";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  navItems: INavData[] = [];

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.navItems = this.setNavigation();
  }

  private setNavigation(): INavData[] {
      const role = this.loginService.currentUserInfoValue.userInfo.roles[0];
    if (role.admin){
      return role.id === 1 ? adminSupervisorNavigationList : adminNavigationList;
    }

    if (role.agent) {
      switch (role.name) {
        case 'AGENT_MANAGER': return agentNavigationManager;
        case 'AGENT_SUPERVISOR': return agentNavigationSupervisor;
        default: return agentNavigationCapture;
      }
    }

    if (role.bank) {
      switch (role.name) {
        case 'BANK_MANAGER': return bankNavigationManager;
        case 'BANK_SUPERVISOR': return bankNavigationSupervisor;
        case 'BANK_CAPTURER': return bankNavigationCapture;
        default: return guestNavigationList;
      }
    }

  }
}
