import {Component} from '@angular/core';
import {DropdownComponent} from '../../material/dropdown/dropdown.component';
import {LoginService} from '../../services/login.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {BnNgIdleService} from "bn-ng-idle";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router,
    private bnIdle: BnNgIdleService
  ) {
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

  ngOnInit(): void {
    // to time out after 300 seconds
    this.bnIdle.startWatching(environment.timeout).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.loginService.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }
}
