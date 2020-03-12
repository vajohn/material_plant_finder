import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-p404',
  templateUrl: './p404.component.html',
  styleUrls: ['./p404.component.scss']
})
export class P404Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
