import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

declare var window: any;

@Component({
  selector: 'nav-header',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  styleUrls: ['nav-header.component.scss'],
  templateUrl: 'nav-header.component.html'
})
export class NavHeaderComponent {

  menuItems = [{
    "label": "Home",
    "slug": "/home",
    "external": false,
    "logo": false,
    "admin": false,
    "loggedIn": false
  }, {
    "label": "My Series",
    "slug": "/series",
    "external": false,
    "logo": false,
    "admin": false,
    "loggedIn": true
  }, {
    "label": "Admin",
    "slug": "/admin",
    "external": false,
    "logo": false,
    "admin": true,
    "loggedIn": true
  }, {
    "label": "Report Bug",
    "slug": "/report-bug",
    "external": false,
    "logo": false,
    "admin": false,
    "loggedIn": false
  }, {
    "label": "Contact",
    "slug": "/contact",
    "external": false,
    "logo": false,
    "admin": false,
    "loggedIn": false
  }];

  menuOpen = false;
  showModal = false;
  donationModalVisible = false;
  activeMenu = "";
  user: any = false;

  public elementRef;

  // Watch for route changes and ensure that the menu is closed
  constructor(router: Router, private Auth: AuthService, myElement: ElementRef) {
    this.elementRef = myElement;

    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.menuOpen = false;
        this.activeMenu = "";
      }
      if(event instanceof NavigationEnd) {
        this.activeMenu = event.url;
      }
    });

    this.Auth.userState.subscribe(value => {
      this.user = value;
      this.menuOpen = false;
    });
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if(!inside){
      this.menuOpen = false;
    }
  }


  // This toggles the menu open state by adding an open class
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onCloseModal() {
    this.showModal = false;
  }

  showDonationModal() {
    this.donationModalVisible = true;
  }

  logoff() {
    this.Auth.logout().subscribe();
  }

  canShowMenuItem(item) {
    if (!this.user && item.loggedIn) return false;
    if ((!this.user && item.admin) || (this.user && item.admin && this.user.admin == false)) return false;
    return true;
  }

  ngOnInit() {}
}
