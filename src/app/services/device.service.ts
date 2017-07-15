import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

declare var window: any;

@Injectable()
export class DeviceService {

  public isMobile = new BehaviorSubject(null);

  constructor() {
    this.detect();

    window.onresize = () => {
      this.detect();
    };
  }

  getWindow() {
    return window.innerWidth;
  }

  detect() {
    this.isMobile.next(this.getWindow() <= 768);
  }
}
