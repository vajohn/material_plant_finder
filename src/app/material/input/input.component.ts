import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() placeholder = 'text';
  @Input() formControlName = 'text';
  @Input() name = 'text';
  @Input() id = 'text';
  @Input() type = 'text';
  @Input() icon = 'autorenew';

  constructor() { }

  ngOnInit(): void {
  }

}
