import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor( private auth : AuthService, private router : Router ) {
    console.log(this.auth.loggedIn());
  }

  // No access, take them home
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Requires an admin role
    if (route.data && route.data.roles && route.data.roles == 'admin') {
      console.log("ROUTE REQUIRES ADMIN");
      if (this.auth.isAdmin()) {
        console.log("LUCKY FOR YOU, YOU ADMIN");
        return true;
      }
      this.router.navigate([ '/home' ]);
      return false;
    }

    // Just requires the user to be logged in
    console.log("CHECKING IF LOGGED IN");
    if(this.auth.loggedIn()) return true;
    this.router.navigate([ '/home' ]);
    return false;
  }

  canActivateChild() {
    //console.log('checking child route access');
    // TODO ON SUB ROUTE
    return true;
  }
}
