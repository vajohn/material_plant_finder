import {Component} from '@angular/core';
import { navItems } from 'src/app/utilities/_nav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public year;
  // public userName: UserModel.User;
  public items = new Array(500);
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor() {
    this.year = new Date().getFullYear();
    // this.userName = (JSON.parse(sessionStorage.getItem(StorageCase.currentUser)) as UserModel.User);
  }


  logout() {
    sessionStorage.clear();
  }
}
