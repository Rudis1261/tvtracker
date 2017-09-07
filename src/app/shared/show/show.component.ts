import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenRingService } from '../../services/token-ring.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  slug: number;
  episodes: any = false;
  show: any = false;

  private subRoute: any;
  private subEpisodes: any;
  private subShow: any;

  constructor(private route: ActivatedRoute, private router: Router, private TRS: TokenRingService, private titleService: Title) {
    this.subRoute = this.route.params.subscribe(params => {
      this.slug = params['slug'];

      if (this.slug) {
        this.subEpisodes = this.TRS.apiCall(environment.endpoint['episodes-by-slug'], { 'slug': this.slug }).subscribe((data) => {
          console.log("EPISODE, data.data.items.length", data.data.items.length);
          if (data && data.data && data.data.items) {
            this.episodes = data.data.items;
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

  ngOnInit() {
    this.titleService.setTitle('TV Tracker');
  }

  ngOnDestroy() {
    if (this.subRoute) this.subRoute.unsubscribe();
    if (this.subEpisodes) this.subEpisodes.unsubscribe();
    if (this.subShow) this.subShow.unsubscribe();
  }
}
