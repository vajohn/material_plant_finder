import {Component, ElementRef, ViewChild} from '@angular/core';
import {navItems} from 'src/app/utilities/_nav';
import {SideMenuComponent} from '../../material/side-menu/side-menu.component';
import {HeaderService} from '../../material/header/header.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = true;
  public navItems = navItems;
  // public userName: UserModel.User;
  public items = new Array(500);
  @ViewChild('sideNavButton', {read: ElementRef, static: false}) sideNavButton: ElementRef;

  toggleMinimize() {
    this.sidebarMinimized = !this.sidebarMinimized;

    if (this.sidebarMinimized) {
      this.sideNavButton.nativeElement.classList.add('active');
    }

    if (!this.sidebarMinimized) {
      this.sideNavButton.nativeElement.classList.remove('active');
    }
  }

  constructor(public headerService: HeaderService) {
    // this.userName = (JSON.parse(sessionStorage.getItem(StorageCase.currentUser)) as UserModel.User);
  }


}
