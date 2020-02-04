import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ColorCase} from '../utilities/colors';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() color: string;
  @Input() size: string;
  @Input() raised = true;
  @ViewChild('materialButton', {read: ElementRef, static: false}) materialButton: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.setColor();
    this.setRaised();
  }

  private setColor() {
    switch (this.color) {
      case ColorCase.primary:
        this.materialButton.nativeElement.classList.add(ColorCase.primary);
        break;
      case ColorCase.secondary:
        this.materialButton.nativeElement.classList.add(ColorCase.secondary);
        break;
      default:
        this.materialButton.nativeElement.classList.add(ColorCase.primary);
    }
  }

  private setRaised() {
    if (this.raised) {
      this.materialButton.nativeElement.classList.add('md-btn-raised');
    }
  }
}

