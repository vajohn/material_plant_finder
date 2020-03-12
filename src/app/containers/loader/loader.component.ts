import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {OverlayRef} from '@angular/cdk/overlay';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public overlayRef: OverlayRef) { }

  ngOnInit() {
  }

  dismiss() {
    this.overlayRef.dispose();
  }

}
