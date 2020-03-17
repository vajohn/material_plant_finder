import {Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ReceiptComponent} from './receipt.component';
import {ReceiptOverlayRef} from './receipt-overlay.ref';


@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
// Inject overlay service
  constructor(private overlay: Overlay, private injector: Injector) { }

  open<R = any, T = any>(content?: string | TemplateRef<any> | Type<any>, data?: T) {

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    overlayRef.attach(new ComponentPortal(ReceiptComponent));

    const myOverlayRef = new ReceiptOverlayRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(myOverlayRef, this.injector);
    // overlayRef.attach(new ComponentPortal(ReceiptComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: ReceiptOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[ReceiptOverlayRef, ref]]);
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
