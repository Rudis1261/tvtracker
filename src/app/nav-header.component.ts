import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

declare var window: any;

@Component({
  selector: 'nav-header',
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
                    <a *ngIf="!menuItem.external" [routerLink]="[menuItem.slug]" [class.active]="menuItem.slug == activeMenu">
                      {{menuItem.label}}
                    </a>
                    <a *ngIf="menuItem.external" target="_blank" href="{{menuItem.slug}}" [class.active]="menuItem.slug == activeMenu">
                      <img *ngIf="menuItem.logo" [src]="menuItem.logo" /> {{menuItem.label}}
                    </a>
                  </li>
                  <!-- Login / Logout -->
                  <!--<li class="login">
                    <i class="icon-login" (click)="showModal = !showModal"  title="Login Now"></i>
                    <i class="icon-logout" (click)="logoff()" title="Logoff"></i>
                  </li>-->
                </ul>
              </div>
            </header>

            <app-modal [(visible)]="showModal" [(title)]="modalTitle">
              <app-login (onCloseModal)="onCloseModal()"></app-login>
            </app-modal>`
})
export class NavHeaderComponent {

  menuItems = [{
    "label": "Home",
    "slug": "/home",
    "external": false,
    "logo": false,
    "admin": false
  }, {
    "label": "Series",
    "slug": "/series",
    "external": false,
    "logo": false,
    "admin": false
  }, {
    "label": "404",
    "slug": "/404",
    "external": false,
    "logo": false,
    "admin": false
  }];

  menuOpen = false;
  showModal = false;
  activeMenu = "";
  modalTitle = "Login";

  // Watch for route changes and ensure that the menu is closed
  constructor(router: Router) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.menuOpen = false;
        this.activeMenu = "";
      }
      if(event instanceof NavigationEnd) {
        this.activeMenu = event.url;
      }
    });
  }

  // This toggles the menu open state by adding an open class
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onCloseModal() {
    this.showModal = false;
  }

  logoff() {
    // this.af.auth.logout();
    // this.auth = false;
    // window.location.reload();
  }

  ngOnInit() {
    // this.af.auth.subscribe(auth => {
    //   if(auth && auth.auth) {
    //     this.auth = auth.auth;
    //   }
    // });
  }
}
