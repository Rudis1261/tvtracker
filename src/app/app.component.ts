import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare var ga:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	private currentRoute:string;

	constructor(public router: Router) {
    // router.events.distinctUntilChanged((previous: any, current: any) => {
    //   if(current instanceof NavigationEnd) {
    //     return previous.url === current.url;
    //   }
    //   return true;
    // }).subscribe((x: any) => {
    // 	if (x.urlAfterRedirects) {
    // 		ga('set', 'page', x.urlAfterRedirects);
    // 	}
    //   ga('send', 'pageview', x.url);
    // });
  }
}
