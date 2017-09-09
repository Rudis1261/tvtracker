import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

declare var window: any;

@Injectable()
export class DeviceService {

  public isMobile = new BehaviorSubject(null);

  constructor() {
    this.detect();
    let that = this;
    let resizeTimeout;

    window.onresize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function(){
        that.detect();
      }, 30);
    };
  }

  getWindow() {
    return window.innerWidth;
  }

  detect() {
    this.isMobile.next(this.getWindow() <= 768);
  }
}
