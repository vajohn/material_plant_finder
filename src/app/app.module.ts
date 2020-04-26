import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {DefaultLayoutComponent} from './containers/default-layout';
import {LoaderComponent} from './containers/loader';

import {LoginComponent} from './views/authentication/login/login.component';
import {P404Component} from './views/errors/p404/p404.component';
import {P500Component} from './views/errors/p500/p500.component';
import {StewardMaterialModule} from './material/steward-material.module';
import {SharedComponentsModule} from './shared-components/shared-components.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {OverlayModule} from '@angular/cdk/overlay';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpCustomInterceptor} from './services/http.interceptor';

import {NgxPrintModule} from 'ngx-print';
import {ModalsModule} from "./modals/modals.module";
import {MaterialComponentsModule} from "./utilities/material.module";
import {DirectivesModule} from "./directives/directives.module";

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  LoaderComponent,
];

const APP_COMPONENTS = [
  LoginComponent,
  P404Component,
  P500Component
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentsModule,
    NgxPrintModule,
    StewardMaterialModule,
    NgxSpinnerModule,
    OverlayModule,
    ModalsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    DirectivesModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
