import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements AfterViewInit {
  @Input() background = 0.5;
  @Input() classes = 'f';
  @ViewChild('card', {static: false}) card: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.card.nativeElement, 'background-color', `rgba(255, 255, 255, ${this.background})`);
    this.renderer.addClass(this.card.nativeElement, this.classes);
  }



}
