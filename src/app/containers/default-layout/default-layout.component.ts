import {Component, ElementRef, ViewChild} from '@angular/core';
import {navItems} from 'src/app/utilities/_nav';
import {HeaderService} from '../../material/header/header.service';
import {DropdownComponent} from "../../material/dropdown/dropdown.component";
import {LoginService} from "../../services/login.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";


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

  constructor(
    public headerService: HeaderService,
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router
  ) {
    // this.userName = (JSON.parse(sessionStorage.getItem(StorageCase.currentUser)) as UserModel.User);
  }

  public open(): void {
    const dialogRef = this.dialog.open(DropdownComponent, {
      position: {right: `0.5em`, top: `4.5em`},
      backdropClass: 'clearHeader'
    });

    dialogRef.afterClosed().subscribe(result => {

      switch (result) {
        case 'logout':
          this.loginService.logout();
          this.router.navigateByUrl('/login');
          break;
        case 'settings':
          break;
      }
    });
  }


}
