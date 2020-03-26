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
import {ToastrModule} from 'ngx-toastr';
import {ToastComponent} from './shared-components/toast/toast.component';
import {HttpCustomInterceptor} from './services/http.interceptor';
import {CustomerRegistrationComponent} from './containers/customer-registration/customer-registration.component';
import {ReceiptComponent} from './containers/receipt/receipt.component';
import {MaterialComponentsModule} from './material.module';
import {NgxPrintModule} from 'ngx-print';
import { ApproveComponent } from './containers/approve/approve.component';
import { ForgotComponent } from './containers/forgot/forgot.component';
import { ResetComponent } from './containers/reset/reset.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  LoaderComponent,
];

const APP_COMPONENTS = [
  LoginComponent, P404Component, P500Component
];

const APP_MODALS = [
  ReceiptComponent,
  ToastComponent,
  CustomerRegistrationComponent,
  ApproveComponent,
  ForgotComponent,
  ResetComponent
];

@NgModule({
  entryComponents: [...APP_MODALS],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_MODALS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentsModule,
    NgxPrintModule,
    StewardMaterialModule,
    NgxSpinnerModule,
    OverlayModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      toastClass: '',
      toastComponent: ToastComponent,
    }),
    BrowserAnimationsModule,
    MaterialComponentsModule,
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
