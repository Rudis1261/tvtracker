import { Component } from '@angular/core';
import { LoadedService } from '../../services/loaded.service';

declare var Swiper: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent{

  constructor(private LS: LoadedService) {
    this.LS.waitForLoad('Swiper', () => {

      let mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // If we need pagination
        pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // And if we need scrollbar
        scrollbar: '.swiper-scrollbar',
      });
    });
  }
}
