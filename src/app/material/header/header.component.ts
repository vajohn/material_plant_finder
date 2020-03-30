import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  show = false;

  constructor(private loginService: LoginService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loginService.currentInfoUser.subscribe(d => {
      this.username = d.userInfo.firstName + ' ' + d.userInfo.lastName;
    });
  }


}
