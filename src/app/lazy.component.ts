import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger } from '@angular/core';

declare var Image:any;

@Component({
  selector: 'lazy',
  template: `
  <img class="lazy-loader" [src]="this.dataSrc" [style.width]="width" [style.height]="height" alt="image" />
 `
})
export class LazyComponent implements OnInit {

  @Input() img: any;
  @Input() width: string = "100%";
  @Input() height: string = "auto";
  @Input() async: boolean = false;
  dataSrc: string;

  constructor() {
    this.dataSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU09B9CgACOQFaAVjiZgAAAABJRU5ErkJggg==";
  }

  getImage(data) {
    var curImg = new Image();
    curImg.src = data;
    curImg.onload = () => {
      this.dataSrc = data;
    }
  }

  ngOnInit() {
    if (this.async) {
      this.img.then((data) => { this.getImage(data) });
    } else {
      this.getImage(this.img);
    }
  }
}
