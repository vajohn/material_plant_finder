import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {LoaderComponent} from '../containers/loader';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader: boolean;
  shouldShowLoader: Subject<boolean> = new Subject<boolean>();
  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) {
    this.showLoader = false;
  }

  showHide() {
    this.showLoader = !this.showLoader;
    this.shouldShowLoader.next(this.showLoader);
  }

  show() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({hasBackdrop: true});
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(LoaderComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); //
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
