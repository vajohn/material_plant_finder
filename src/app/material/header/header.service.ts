import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  show = false;

  constructor() {
  }

  open() {
    this.show = !this.show;
    return this.show;
  }
}
