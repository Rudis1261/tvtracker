import { 
  Component, 
  OnInit, 
  Input,
  ElementRef 
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate, 
  transition
} from '@angular/animations'

import { environment } from '../../../environments/environment';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-series-info-box',
  templateUrl: './series-info-box.component.html',
  styleUrls: ['./series-info-box.component.scss'],
  host: {
    '(document:click)': 'handleClick($event)',
  }
})
export class SeriesInfoBoxComponent implements OnInit {

  elementRef;
  isMobile: any = false;
  streamingServiceUrl: any = false;
  showWarning: any = false;

  private isMobileSub: any = false;
  @Input() series:any = false;
  @Input() open:any = false;

  constructor(
    myElement: ElementRef,
    private Device: DeviceService
  ) {
    this.showWarning = false;
    this.elementRef = myElement;
    this.streamingServiceUrl = environment.streamingServiceUrl;
  }

  getImagePoster(series) {
    if (!series.image_url || series.image_url == '') {
      return 'assets/img/missing.png';
    }
    return series.image_url;
  }

  close() {
    this.series = false;
    this.open = false;
    this.showWarning = false;
  }

  setShowWarning() {
    this.showWarning = false;
    setTimeout(() => {
      this.showWarning = true;
    }, 100);
  }

  handleClick(event){
    var clickedComponent = event.target;
    if (clickedComponent.classList.contains('background')) {
      this.close();
    }
  }

  ngOnInit() {
    this.showWarning = false;
    this.isMobileSub = this.Device.isMobile.subscribe((data) => {
      this.isMobile = data;
    });
  }

  ngOnDestroy() {
    if (this.isMobileSub) this.isMobileSub.unsubscribe();
  }
}
