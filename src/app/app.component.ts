import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FcmService } from './services/fcm.service';

declare var ga:any;
declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(public router: Router, public FCM: FcmService) {
    router.events.distinctUntilChanged((previous: any, current: any) => {
      if(current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    }).subscribe((x: any) => {

    	if (x.urlAfterRedirects) {
    		ga('set', 'page', x.urlAfterRedirects);
    	}
      ga('send', 'pageview', x.url);

      window.scrollTo(0, 0);
    });
  }
}
