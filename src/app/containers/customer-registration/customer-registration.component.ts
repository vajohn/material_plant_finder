import { Component, OnInit } from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(public overlayRef: OverlayRef) { }

  ngOnInit(): void {
  }

}
