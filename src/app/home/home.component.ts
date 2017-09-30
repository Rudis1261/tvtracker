import { Component, OnInit } from '@angular/core';
import { TokenRingService } from '../services/token-ring.service';
import { environment } from '../../environments/environment';
import { LoadedService } from '../services/loaded.service';
import { Title } from '@angular/platform-browser';

declare var Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private seriesSub: any;
  private recentSub: any;
  private futureSub: any;

  private recentSwiper: any;
  private futureSwiper: any;

  activeSeries: any = false;
  recentEpisodes: any = [];
  futureEpisodes: any = [];

  constructor(private TRS: TokenRingService, private LS: LoadedService, private titleService: Title) {
    this.scaffolding();
  }

  scaffolding() {
    this.recentEpisodes = [];
    this.futureEpisodes = [];
  }

  getImagePoster(episode) {
    if (!episode.image_url || episode.image_url == '') {
      return 'assets/img/missing.png';
    }
    return episode.image_url;
  }

  createRecentSub() {
    let endpoint = 'episodes-recent';
    this.recentSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {
      this.recentEpisodes = data.data.items;

      setTimeout(() => {
        this.buildSwiper('recent');
      }, 100);
    });
  }

  createFutureSub() {
    let endpoint = 'episodes-future';
    this.futureSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {
      this.futureEpisodes = data.data.items;

      setTimeout(() => {
        this.buildSwiper('future');
      }, 100);
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
        height: 'auto',
        slidesPerColumn: 1,
        slidesPerView: 6,
        slidesPerGroup: 6,
        observer: true,
        initialSlide: 0,
        preloadImages: false,
        lazyLoading: true,
        spaceBetween: 20,
        breakpoints: {
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4
          }
        }
      };

      if (type == 'recent') {
        let recentParams = Object.assign({}, swiperParams);
        recentParams.pagination = "#recent-pagination";
        recentParams.prevButton = "#recent-prev";
        recentParams.nextButton = "#recent-next";
        this.recentSwiper = new Swiper('.swiper-container-recent', recentParams);
      }

      if (type == 'future') {
        let futureParams = Object.assign({}, swiperParams);
        futureParams.pagination = "#future-pagination";
        futureParams.prevButton = "#future-prev";
        futureParams.nextButton = "#future-next";
        this.futureSwiper = new Swiper('.swiper-container-future', futureParams);
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle('TV Tracker | Home');
    this.createRecentSub();
    this.createFutureSub();
    this.activeSeries = false;
  }

  setActiveSeries(series) {
    this.activeSeries = false;
    setTimeout(() => {
      this.activeSeries = series;
    }, 100);
  }

  ngOnDestroy() {
    if (this.seriesSub) this.seriesSub.unsubscribe();
    if (this.recentSub) this.recentSub.unsubscribe();
    if (this.futureSub) this.futureSub.unsubscribe();

    if (this.futureSwiper) this.futureSwiper.destroy();
    if (this.recentSwiper) this.recentSwiper.destroy();
  }
}
