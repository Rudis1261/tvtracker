import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenRingService } from '../../services/token-ring.service';
import { AuthService } from '../../services/auth.service';
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
  activeSeason: any;
  activeEpisode: any = false;
  hasSpecials: any = false;
  dropdownOpen: boolean = false;
  isMobile: any;
  user: any;
  streamingServiceUrl: any = false;
  showWarning: any = false;

  private subRoute: any;
  private subEpisodes: any;
  private subShow: any;
  private authSub: any;
  private isMobileSub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TRS: TokenRingService,
    private Auth: AuthService,
    private titleService: Title,
    private Device: DeviceService,
  ) {
    this.scaffolding();
    this.streamingServiceUrl = environment.streamingServiceUrl;
  }

  setShowWarning() {
    this.showWarning = false;
    setTimeout(() => {
      this.showWarning = true;
    }, 100);
  }

  scaffolding() {
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
  }

  getImagePoster(show) {
    if (!show.image_url || show.image_url == '') {
      return 'assets/img/missing.png';
    }
    return show.image_url;
  }

  processEpisodes() {
    if (!this.episodes) {
      return false;
    }

    let now = (new Date().getTime() / 1000);
    let day = (24 * 60 * 60);
    let twoWeeks = (day * 14);
    let lastSeason = false;
    let foundSeason = false;

    this.seasons = {};
    this.episodes.forEach((episode, index) => {
      this.seasons[episode.s] = (episode.s == 0 ? "Specials" : "Season " + episode.s);

      if (episode.date > now || episode.data < now + twoWeeks) {
        foundSeason = true;
        this.setActiveSeason(episode.s);
      }

      this.episodes[index].future = episode.date > now && episode.date < (now + twoWeeks);
      this.episodes[index].recent = episode.date < now && episode.date > (now - twoWeeks);
    });

    // Fall back to the last season if no recent seasons could be matched
    if (foundSeason == false) {
      this.episodes.forEach((episode, index) => {
        if (episode.s > lastSeason) {
          lastSeason = episode.s;
        }
      });
      this.setActiveSeason(lastSeason);
    }
  }

  setActiveSeason(season) {
    console.log("SETTING ACTIVE SEASON", season);
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

    this.showWarning = false;

    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
    });

    this.titleService.setTitle('TV Tracker');
    this.subRoute = this.route.params.subscribe(params => {
      this.slug = params['slug'];

      this.isMobileSub = this.Device.isMobile.subscribe((data) => {
        this.isMobile = data;
      });

      if (this.slug) {
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

        this.subEpisodes = this.TRS.apiCall(environment.endpoint['episodes-by-slug'], { 'slug': this.slug }).subscribe((data) => {
          console.log("EPISODE, data.data.items.length", data.data.items.length);
          if (data && data.data && data.data.items) {
            this.episodes = data.data.items;
            this.processEpisodes();
          } else {
            this.episodes = false;
          }
        });

      // Otherwise we have a 404 on our hands
      } else {
        this.router.navigate([ '/404' ]);
      }
    });
  }

  ngOnDestroy() {
    if (this.isMobileSub) this.isMobileSub.unsubscribe();
    if (this.subRoute) this.subRoute.unsubscribe();
    if (this.subEpisodes) this.subEpisodes.unsubscribe();
    if (this.subShow) this.subShow.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }
}
