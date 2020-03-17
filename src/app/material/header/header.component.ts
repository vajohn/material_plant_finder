import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {HeaderService} from './header.service';
import {ReceiptComponent} from '../../containers/receipt/receipt.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DropdownComponent} from '../dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  show = false;

  constructor(private loginService: LoginService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.loginService.currentInfoUser.subscribe(d => {
      this.username = d.userInfo.firstName + ' ' + d.userInfo.lastName;
    });
  }

  open() {
    const dialogRef = this.dialog.open(DropdownComponent, {
      data: {name: 'this.name', animal: 'this.animal'},
      position: {right: `0.5em`, top: `4.5em`},
      backdropClass: 'clearHeader'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      switch (result) {
        case 'Logout':
          this.loginService.logout();
          this.router.navigateByUrl('/login');
          break;
        case 'settings':
          break;


      }
    });
  }
}
