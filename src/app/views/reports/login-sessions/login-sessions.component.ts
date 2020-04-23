import { Component, OnInit } from '@angular/core';
import {ReportingService} from "../../../services/reporting.service";

@Component({
  selector: 'app-login-sessions',
  templateUrl: './login-sessions.component.html',
  styleUrls: ['./login-sessions.component.scss']
})
export class LoginSessionsComponent implements OnInit {

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
  }

}
