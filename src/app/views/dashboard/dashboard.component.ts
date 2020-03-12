import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items = [];

  constructor(public router: Router, private as: LoginService) {
  }

  ngOnInit() {

  }

  check() {
    const token = this.as.getDecodedAccessToken();
    console.log('token', token);
  }

  change($event: any) {
    console.log($event);
  }
}
