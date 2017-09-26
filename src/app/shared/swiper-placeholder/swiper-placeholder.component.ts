import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swiper-placeholder',
  templateUrl: './swiper-placeholder.component.html',
  styleUrls: ['./swiper-placeholder.component.scss']
})
export class SwiperPlaceholderComponent implements OnInit {

  placeholders: any = [{
    'test': 1
  }, {
    'test': 2
  }, {
    'test': 3
  }, {
    'test': 4
  }, {
    'test': 5
  }, {
    'test': 6
  }];

  constructor() { }

  ngOnInit() {
  }
}
