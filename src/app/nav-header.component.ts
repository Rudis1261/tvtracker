import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

declare var window: any;

@Component({
  selector: 'nav-header',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  template: `<header>
              <div class="container">
                <!-- BRAND -->
                <ul class="brand clickable" [routerLink]="['/home']">
                  <li class="logo-container">
                    <span class="logo">
                      <img src="assets/img/logo_small.png" width="39" height="39" alt="logo" />
                    </span>
                  </li>
                  <li class="brand-name">
                    Tracker<span class="dot">&nbsp;</span><div>.co.za</div>
                   </li>
                </ul>

                <!-- BURGER MENU -->
                <ul class="menu" (click)="toggleMenu()" [class.open]="menuOpen">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>

                <!-- THE MENU THAT POPS OPEN -->
                <ul class="nav" [class.open]="menuOpen">
                  <li *ngFor="let menuItem of menuItems">
                    <a *ngIf="!menuItem.externals && canShowMenuItem(menuItem)" [routerLink]="[menuItem.slug]" [class.active]="menuItem.slug == activeMenu">
                      {{menuItem.label}}
                    </a>
                    <a *ngIf="menuItem.external" target="_blank" href="{{menuItem.slug}}" [class.active]="menuItem.slug == activeMenu">
                      <img *ngIf="menuItem.logo" [src]="menuItem.logo" /> {{menuItem.label}}
                    </a>
                  </li>
                  <!-- Login / Logout -->
                  <li class="login">
                    <span *ngIf="!user" (click)="showModal = !showModal">
                      <i class="icon-login" title="Login Now"></i><span>Login</span>
                    </span>\
                    <span (click)="logoff()" *ngIf="user">
                      <i class="icon-logout" title="Logoff"></i><span>Logoff {{user.username}}</span>
                    </span>\
                  </li>
                </ul>
              </div>
            </header>

            <app-modal [(visible)]="showModal">
              <app-login (onCloseModal)="onCloseModal()"></app-login>
            </app-modal>`
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
