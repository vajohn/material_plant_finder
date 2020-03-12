import {Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {CustomerRegistrationComponent} from './customer-registration.component';
import {FormOverlayRef} from './form-overlay.ref';


@Injectable({
  providedIn: 'root'
})
export class CustomerRegistrationService {
// Inject overlay service
  constructor(private overlay: Overlay, private injector: Injector) { }

  open<R = any, T = any>(content?: string | TemplateRef<any> | Type<any>, data?: T) {

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    overlayRef.attach(new ComponentPortal(CustomerRegistrationComponent));

    const myOverlayRef = new FormOverlayRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(myOverlayRef, this.injector);
    // overlayRef.attach(new ComponentPortal(CustomerRegistrationComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: FormOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[FormOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

  private getOverlayConfig(config: FormDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }
}

interface FormDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}
