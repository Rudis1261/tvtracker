import { Component, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
  	<div class="page-loader" *ngIf="show">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `
})

export class Loading {
  @Input() show = false;
  constructor() {}
}
