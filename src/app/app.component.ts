import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FcmService } from './services/fcm.service';
import { DOCUMENT } from '@angular/platform-browser';

declare var ga:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(public router: Router, public FCM: FcmService, @Inject(DOCUMENT) private document: Document) {
    router.events.distinctUntilChanged((previous: any, current: any) => {
      if(current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {

      // Scroll Window to top
      this.document.body.scrollTop = 0;

    	if (x.urlAfterRedirects) {
    		ga('set', 'page', x.urlAfterRedirects);
    	}
      ga('send', 'pageview', x.url);
    });
  }
}
