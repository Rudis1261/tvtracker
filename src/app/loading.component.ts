import { Component, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
  	<div class="loading-bar" *ngIf="loading">&nbsp;</div>
  	<div class="loader" *ngIf="loading">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  `,
  styles: [`
 	.loading-bar {
 	  position: absolute;
 	  background: #4cb8ff;
 	  content: " ";
 	  display: block;
 	  top: 60px;
 	  left: 0;
 	  right: 0;
 	  height: 4px;
 	  width: 0%;
	  animation: pulse 1s infinite;
	  box-shadow: 0px 0px 11px aqua;
	}

	@keyframes pulse {
	  0% {
	    width: 0%;
	  }
	  100% {
	    width: 100%;
	  }
	}
  `]
})

export class LoadingBar {
  loading = true;
  @Input() watch = false;
  ngOnChanges(test1, test2) {
    //console.log(this.watch);
    this.loading = this.watch;
  }
}
