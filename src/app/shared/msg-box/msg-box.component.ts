import {
  Component, OnInit, Input, Output,
  OnChanges, EventEmitter, trigger,
  state, style, animate, transition
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

  constructor() { }

  ngOnInit() {}

}
