import {
  Component, OnInit, Input, Output,
  OnChanges, EventEmitter, trigger,
  state, style, animate, transition,
  SimpleChanges
} from '@angular/core'

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.scss']
})
export class MsgBoxComponent implements OnInit {

  @Input() success:any = false;
  @Input() error:any = false;
  @Input() style:any = false;
  @Input() autoHide: any = false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changeRecord: SimpleChanges): any {
    if (!this.autoHide) return false;

    if (changeRecord.success && changeRecord.success.currentValue && changeRecord.success.currentValue.message) {
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }

    if (changeRecord.error && changeRecord.error.currentValue && changeRecord.error.currentValue.message) {
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
}
