import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-prompt',
  template: ''
})
export class PromptComponent implements OnInit {

  @Input() link: any = false;
  @Input() open: any = true;
  @Input() message: any = false;

  constructor() {}

  ngOnChanges(changeRecord: SimpleChanges): any {
    if (changeRecord.open && changeRecord.open.currentValue) {
      if (!this.open || !this.message || !this.link) {
        //return false;
      }

      // Make sure the user knows the danger
      if (confirm(this.message)) {
        this.openInNewTab(this.link);
      }
    }
  }

  openInNewTab(url) {
    window.open(url, '_blank').focus();
  }

  ngOnInit() {
    this.open = false;
  }
}
