import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { TokenRingService } from '../services/token-ring.service';
import { DeviceService } from '../services/device.service';
import { environment } from '../../environments/environment';
import { LoadedService } from '../services/loaded.service';

declare var Swiper: any;

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  private recentSub: any;
  private futureSub: any;
  private authSub: any;
  private favSub: any;
  private isMobileSub: any;

  private user: any;
  private recentSwiper: any;
  private futureSwiper: any;

  search: '';
  searching: boolean = false;
  filter: '';
  filtering: boolean = false;
  removing: any;
  showLoadMore: any;
  showLoadMorePerPage: any;
  isMobile: any = false;
  activeSeries: any = false;

  recentEpisodes: any = [];
  futureEpisodes: any = [];
  favorites: any = [];

  constructor(
    private Auth: AuthService,
    private TRS: TokenRingService,
    private LS: LoadedService,
    private titleService: Title,
    private Device: DeviceService
  ) {

    this.showLoadMore = 12;
    this.showLoadMorePerPage = 12;

    this.removing = {};

    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
      this.createRecentSub();
      this.createFutureSub();
      this.createFavSub();
    });
  }

  getImagePoster(episode) {
    if (!episode.image_url || episode.image_url == '') {
      return 'assets/img/missing.png';
    }
    return episode.image_url;
  }

  createRecentSub() {
    let endpoint = (this.user ? 'episodes-user-recent' : 'episodes-recent');
    this.recentSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {
      this.recentEpisodes = data.data.items;
      setTimeout(() => {
        this.buildSwiper('recent');
      }, 300);
    });
  }

  removeFavorite(e, series) {
    e.preventDefault();
    e.stopPropagation();
    if (!series.seriesid || this.removing[series.seriesid]) return false;
    this.removing[series.seriesid] = true;

    // Post and update with the response
    this.TRS.apiPostCall(environment.endpoint['remove-favorite'], { 'seriesid': series.seriesid }).subscribe((data) => {
      if (data.state == "success") {
        if (this.favSub) this.favSub.unsubscribe();
        this.createFavSub();
      }

      this.removing[series.seriesid] = false;
    });
  }

  ngOnSubmit() {
    console.log("FORM SUBMIT");
  }

  createFavSub() {
    if (!this.user) return false;

    this.favSub = this.TRS.apiGetCall(environment.endpoint['user-favorites']).subscribe((data) => {
      this.favorites = data.data.items;
    });
  }

  createFutureSub() {
    let endpoint = (this.user ? 'episodes-user-future' : 'episodes-future');
    this.futureSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {
      this.futureEpisodes = data.data.items;
      setTimeout(() => {
        this.buildSwiper('future');
      }, 300);
    });
  }

  showMore() {
    if (this.showLoadMore > this.favorites.length) return false;
    this.showLoadMore = this.showLoadMore + this.showLoadMorePerPage;
  }

  setActiveSeries(episode) {
    this.activeSeries = false;
    setTimeout(() => {
      this.activeSeries = episode;
    }, 10);
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
    this.titleService.setTitle('TV Tracker | You\'re favorite shows');

    this.isMobileSub = this.Device.isMobile.subscribe((data) => {
      this.isMobile = data;

      if (this.isMobile) {
        this.showLoadMore = 6;
        this.showLoadMorePerPage = 12;
      } else {
        this.showLoadMore = 12;
        this.showLoadMorePerPage = 12;
      }
    });
  }

  ngOnDestroy() {
    if (this.recentSub) this.recentSub.unsubscribe();
    if (this.futureSub) this.futureSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
    if (this.favSub) this.favSub.unsubscribe();
    if (this.isMobileSub) this.isMobileSub.unsubscribe();

    if (this.futureSwiper && typeof this.futureSwiper.destroy == 'function') this.futureSwiper.destroy();
    if (this.recentSwiper && typeof this.recentSwiper.destroy == 'function') this.recentSwiper.destroy();
  }
}
