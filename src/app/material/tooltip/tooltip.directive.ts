import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TooltipComponent} from './tooltip.component';
import {ComponentPortal} from '@angular/cdk/portal';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input() toolTipText: string;
  @Input() placement: string;
  @Input() delay: number;
  offset = 10;
  private overlayRef: OverlayRef;
  tooltip: HTMLElement;

  constructor(private overlay: Overlay, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.overlayRef = this.overlay.create({});
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  // @HostListener('mouseenter')
  // show() {
  //   console.log('show');
  //   // Create tooltip portal
  //   const tooltipPortal = new ComponentPortal(TooltipComponent);
  //
  //   // Attach tooltip portal to overlay
  //   const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tooltipPortal);
  //
  //   // Pass content to tooltip component instance
  //   tooltipRef.instance.text = this.toolTipText;
  // }
  //
  // @HostListener('mouseout')
  // hide() {
  //   console.log('hide');
  //   this.overlayRef.detach();
  // }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.toolTipText) // textNode
    );

    this.renderer.appendChild(document.body, this.tooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    // delay 설정
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {

    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top;
    let left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
