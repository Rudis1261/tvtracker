import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenRingService } from '../../services/token-ring.service';
import { environment } from '../../../environments/environment';
import { DeviceService } from '../../services/device.service';
import { KeysPipe } from '../../pipes/keys.pipe';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  slug: number;
  episodes: any = false;
  show: any = false;
  seasons: any = false;
  activeSeason: any = false;
  activeEpisode: any = false;
  hasSpecials: any = false;
  dropdownOpen: boolean = false;

  private subRoute: any;
  private subEpisodes: any;
  private subShow: any;
  private isMobileSub: any;
  private isMobile: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TRS: TokenRingService,
    private titleService: Title,
    private Device: DeviceService
  ) {

    this.show = {
      "seriesname": "..........",
      "network": ".......",
      "overview": "........................................",
      "image_url": "assets/img/missing.png"
    }

    this.seasons = {
      1: "...",
      2: "..."
    };

    this.hasSpecials = false;

    this.subRoute = this.route.params.subscribe(params => {
      this.slug = params['slug'];

      this.isMobileSub = Device.isMobile.subscribe((data) => {
        this.isMobile = data;
      });

      if (this.slug) {
        this.subEpisodes = this.TRS.apiCall(environment.endpoint['episodes-by-slug'], { 'slug': this.slug, 'reverse': true }).subscribe((data) => {
          console.log("EPISODE, data.data.items.length", data.data.items.length);
          if (data && data.data && data.data.items) {
            this.episodes = data.data.items;
            this.processEpisodes();
          } else {
            this.episodes = false;
          }
        });

        this.subShow = this.TRS.apiCall(environment.endpoint['series-by-slug'], { 'slug': this.slug }).subscribe((data) => {
          if (data && data.data && data.data.items && data.data.items.id) {
            this.show = data.data.items;
            this.titleService.setTitle('TV Tracker | ' + this.show.seriesname);
          } else {
            // Show doesn't exist
            this.show = false;
            this.router.navigate([ '/404' ]);
          }
        });

      // Otherwise we have a 404 on our hands
      } else {
        this.router.navigate([ '/404' ]);
      }
    });
  }

  processEpisodes() {
    if (!this.episodes) {
      return false;
    }

    let now = (new Date().getTime() / 1000);
    let day = (24 * 60 * 60);
    let twoWeeks = (day * 14);

    this.seasons = {};
    this.episodes.forEach((episode, index) => {
      this.seasons[episode.s] = (episode.s == 0 ? "Specials" : "Season " + episode.s);

      if (episode.date > now || episode.data < now + twoWeeks) {
        this.setActiveSeason(episode.s);
      }

      this.episodes[index].future = episode.date > now && episode.date < (now + twoWeeks);
      this.episodes[index].recent = episode.date < now && episode.date > (now - twoWeeks);
    });
  }

  setActiveSeason(season) {
    this.activeSeason = season;
    this.dropdownOpen = false;
  }

  setActiveEpisode(episode) {
    console.log(episode);
    if (this.activeEpisode && this.activeEpisode == episode) {
      return this.activeEpisode = false;
    }
    this.activeEpisode = episode;
  }

  toggleDropDownOpen() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit() {
    this.titleService.setTitle('TV Tracker');
  }

  ngOnDestroy() {
    if (this.isMobileSub) this.isMobileSub.unsubscribe();
    if (this.subRoute) this.subRoute.unsubscribe();
    if (this.subEpisodes) this.subEpisodes.unsubscribe();
    if (this.subShow) this.subShow.unsubscribe();
  }
}
