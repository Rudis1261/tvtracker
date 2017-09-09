import { Directive, Input, OnInit, OnChanges, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  @Input('appAutofocus') autoFocus: boolean;
  constructor(private elementRef: ElementRef) { };

  ngOnInit(): void {
    this.scrollToEle();
  }

  ngOnChanges(): void {
    this.scrollToEle();
  }

  scrollToEle(): void {
    let ele = this.elementRef.nativeElement;

    if (this.autoFocus) {
      ele.parentElement.scrollTop = ele.getBoundingClientRect().top;
      //window.test = ele;
      //console.log(ele.parentElement.scrollTop, ele.getBoundingClientRect().top);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToEle();
    }, 500);
  }
}
