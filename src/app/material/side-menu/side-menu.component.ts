import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  adminNavigationList,
  agentNavigationList,
  bankNavigationList,
  guestNavigationList,
  navItems
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
  radioStatus: boolean;
  @ViewChild('sideNavButton', {read: ElementRef, static: false}) sideNavButton: ElementRef;
  choice: any;
  defaultChoice: any;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.navItems = this.setNavigation();
  }

  show(sidebarMinimized: boolean) {
    if (sidebarMinimized) {
      this.sideNavButton.nativeElement.classList.add('active');
    }

    if (!sidebarMinimized) {
      this.sideNavButton.nativeElement.classList.remove('active');
    }
  }


  private setNavigation(): INavData[] {
    // switch (this.loginService.currentUserInfoValue.userInfo.roles[0].name) {
    //   case '':
    //     break;
    //   case '':
    //     break;
    //   case '':
    //     break;
    //   default:
    //     this.navItems = [];
    //     break;
    // }

    if (this.loginService.currentUserInfoValue.userInfo.roles[0].admin) {
      return navItems;
      // return adminNavigationList;
    }

    if (this.loginService.currentUserInfoValue.userInfo.roles[0].agent) {
      return agentNavigationList;
    }

    if (this.loginService.currentUserInfoValue.userInfo.roles[0].bank) {
      if (this.loginService.currentUserInfoValue.userInfo.roles[0].name === 'GUEST') {
        return guestNavigationList;
      }
      return bankNavigationList;
    }

  }
}
