import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShareComponentsModule} from './share-components/share-components.module';
import {DefaultLayoutComponent} from './containers/default-layout';
import {LoginComponent} from './views/authentication/login/login.component';
import {P404Component} from './views/errors/p404/p404.component';
import {P500Component} from './views/errors/p500/p500.component';
import {MaterialModule} from './material/material.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
const APP_CONTAINERS = [
  DefaultLayoutComponent
];

const APP_COMPONENTS = [
  LoginComponent, P404Component, P500Component
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
    ShareComponentsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
