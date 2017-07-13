import { 
  Component, OnInit, Input, Output, 
  OnChanges, EventEmitter, trigger, 
  state, style, animate, transition 
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      transition('void => *', [
        style({transform: 'translate(-50%, -200%)', opacity: 1 }),
        animate(250)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translate(-50%, -200%)', opacity: 0}))
      ])
    ]),
    trigger('modalBackground', [
      transition('void => *', [
        style({background: 'black', opacity: 1}),
        animate(100)
      ]),
      transition('* => void', [
        animate(500, style({backround: 'transparent', opacity: 0}))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Input() title = false;
  @Input() type = '';
  @Input() footer = false;
  @Input() close: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public modalContent = "";

  constructor() { }

  closeModal(event) {
    if (!event || !event.target || !event.target.attributes || !event.target.attributes.class) {
      return false;
    }

    let eventClass = event.target.attributes.class.value;
  	if (eventClass.indexOf("modal-close") >= 0 || eventClass.indexOf("modal-background") >= 0) {
			this.visible = false;
			this.modalContent = "";
      this.visibleChange.emit(this.visible);
  	}
  }

  openModal(content) {
    this.visible = true;
  	this.modalContent = content;
    this.visibleChange.emit(this.visible);
  }
  
  ngOnInit() {}
}
