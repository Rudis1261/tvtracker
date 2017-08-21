import { Component, OnInit } from '@angular/core';
import { TokenRingService } from '../services/token-ring.service';
import { environment } from '../../environments/environment';
import { LoadedService } from '../services/loaded.service';

declare var Swiper: any;

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  private seriesSub: any;
  private recentSub: any;
  private futureSub: any;

  public series: any = [];
  public recentEpisodes: any = [];
  public futureEpisodes: any = [];

  constructor(private TRS: TokenRingService, private LS: LoadedService) {
    this.seriesSub = this.TRS.apiGetCall(environment.endpoint['series-all']).subscribe((data) => {
      //this.series = data.data.items;
    });

    this.recentSub = this.TRS.apiGetCall(environment.endpoint['episodes-recent']).subscribe((data) => {
      //this.series = data.data.items;
      //console.log("RECENT", data);
      this.recentEpisodes = data.data.items;
      this.buildSwiper('recent');
    });

    this.futureSub = this.TRS.apiGetCall(environment.endpoint['episodes-future']).subscribe((data) => {
      //this.series = data.data.items;
      //console.log("FUTURE", data);
      this.futureEpisodes = data.data.items;
      this.buildSwiper('future');
    });
  }

  buildSwiper(type) {
    this.LS.waitForLoad('Swiper', () => {
      let swiperParams = {
        direction: 'horizontal',
        loop: false,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        scrollbar: '.swiper-scrollbar',
        slidesPerColumn: 4,
        slidesPerView: 4,
        spaceBetween: 20,
        breakpoints: {
          320: {
            slidesPerView: 1
          },
          480: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          }
        }
      };

      if (type == 'recent') {
        let recentParams = Object.assign({}, swiperParams);
        recentParams.pagination = "#recent-pagination";
        recentParams.prevButton = "#recent-prev";
        recentParams.nextButton = "#recent-next";
        new Swiper('.swiper-container-recent', recentParams);
      }

      if (type == 'recent') {
        let futureParams = Object.assign({}, swiperParams);
        futureParams.pagination = "#future-pagination";
        futureParams.prevButton = "#future-prev";
        futureParams.nextButton = "#future-next";
        new Swiper('.swiper-container-future', futureParams);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.seriesSub) this.seriesSub.unsubscribe();
    if (this.recentSub) this.recentSub.unsubscribe();
    if (this.futureSub) this.futureSub.unsubscribe();
  }
}
