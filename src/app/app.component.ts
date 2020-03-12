import { Component } from '@angular/core';
import {LoaderService} from './services/loader.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  template: '    <ngx-spinner\n' +
    '      bdColor = "rgba(109,53,147,0.58)"\n' +
    '      size = "large"\n' +
    '      color = "#ffffff"\n' +
    '      type = "square-loader"\n' +
    '   (click)="spinner.hide()"><p style="color: white" > Loading... </p></ngx-spinner><router-outlet></router-outlet> ',
})
export class AppComponent {
  showLoader = false;
  private subscription: Subscription;

  constructor(ls: LoaderService, public spinner: NgxSpinnerService) {
    this.showLoader = ls.showLoader;
    this.subscription = ls.shouldShowLoader.subscribe((value) => {
      this.showLoader = value;
    });
  }
}
