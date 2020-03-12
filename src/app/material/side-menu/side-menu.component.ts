import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {navItems} from 'src/app/utilities/_nav';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  navItems = navItems;
  radioStatus: boolean;
  @ViewChild('sideNavButton', {read: ElementRef, static: false}) sideNavButton: ElementRef;
  choice: any;
  defaultChoice: any;

  constructor() {
  }

  ngOnInit() {
  }

  show(sidebarMinimized: boolean) {
    if (sidebarMinimized) {
      this.sideNavButton.nativeElement.classList.add('active');
    }

    if (!sidebarMinimized) {
      this.sideNavButton.nativeElement.classList.remove('active');
    }
  }



}
