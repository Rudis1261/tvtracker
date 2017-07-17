import {
  Component, OnInit, Input, Output,
  OnChanges, EventEmitter, trigger,
  state, style, animate, transition
} from '@angular/core';

import { DeviceService } from "../services/device.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalBackground', [
      state('*', style({opacity: 0.0, bottom: 'auto', right: 'auto', width: '0', height: '0'})),
      state('0', style({opacity: 0.0, bottom: 'auto', right: 'auto', width: '0', height: '0'})),
      state('1', style({opacity: 1.0, bottom: 0, right: 0, width: '100%', height: '100%'})),
      transition('0 => 1', [
        animate(0, style({opacity: 1.0, bottom: 0, right: 0, width: '100%', height: '100%' })),
        animate(500, style({opacity: 1.0}))
      ]),
      transition('1 => 0', [
        animate(300, style({opacity: 0}))
      ])
    ]),
    trigger('modal', [
      state('void', style({transform: 'translateY(-300%) translateX(-50%)'})),
      state('0', style({transform: 'translateY(-300%) translateX(-50%)'})),
      state('1', style({transform: 'none', top: '10px', right: '10px', bottom: '10px', left: '10px'})),
      transition('0 => 1', [
        animate(500, style({transform: 'translateY(-50%) translateX(-50%)'}))
      ]),
      transition('1 => 0', [
        animate(300, style({transform: 'translateY(-300%) translateX(-50%)'}))
      ])
    ]),
    trigger('modalMobile', [
      state('void', style({transform: 'translateY(-300%) translateX(-50%)', top: '50%', left: '50%', right: 'auto', bottom: 'auto'})),
      state('0', style({transform: 'translateY(-300%) translateX(-50%)', top: '50%', left: '50%', right: 'auto', bottom: 'auto'})),
      state('1', style({transform: 'none', top: '10px', right: '10px', bottom: '10px', left: '10px'})),
      transition('0 => 1', [
        animate(500, style({transform: 'none', top: '10px', right: '10px', bottom: '10px', left: '10px'}))
      ]),
      transition('1 => 0', [
        animate(300, style({transform: 'translateY(-300%) translateX(-50%)', top: '50%', left: '50%', right: 'auto', bottom: 'auto'}))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean = false;
  @Input() title = false;
  @Input() type = '';
  @Input() footer = false;
  @Input() close: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public modalContent = "";
  public isMobile:boolean = false;

  constructor(private DS: DeviceService) {
    this.DS.isMobile.subscribe((data) => {
      this.isMobile = data;
    });
  }

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
