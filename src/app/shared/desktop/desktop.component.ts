import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html'
})
export class DesktopComponent implements OnInit {

  isMobile: any = false;
  deviceSub: any;
  constructor(Device: DeviceService) {
    this.deviceSub = Device.isMobile.subscribe((data) => {
      this.isMobile = data;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.deviceSub) this.deviceSub.unsubscribe();
  }
}
