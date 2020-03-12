import {Injectable} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {CustomerRegistrationComponent} from './customer-registration.component';


@Injectable({
  providedIn: 'root'
})
export class CustomerRegistrationService {
// Inject overlay service
  constructor(private overlay: Overlay) { }

  open(config: FormDialogConfig = {}) {

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    overlayRef.attach(new ComponentPortal(CustomerRegistrationComponent));
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
