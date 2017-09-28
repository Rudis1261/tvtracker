import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenRingService } from '../../services/token-ring.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  type: any = false;
  user: any = false;
  data: any = false;
  error: any = false;
  success: any = false;
  dataEndPoints: any = false;

  private subRoute: any = false;
  private subAuth: any = false;
  private subData: any = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TRS: TokenRingService,
    private Auth: AuthService
  ) {
    this.dataEndPoints = {
      'users': "user-list",
      'shows': "user-list",
      'posters': "user-list",
    }
  }

  ngOnInit() {
    this.subAuth = this.Auth.userState.subscribe(value => {
      this.user = value;
      if (!this.user || !this.user.admin) {
        this.router.navigate([ '/home' ]);
      }
    });

    this.subRoute = this.route.params.subscribe(params => {
      this.type = params['type'] || 'users';
      this.success = false;
      this.getData();
    });
  }

  getData() {
    if (!this.type) return false;
    this.subData = this.TRS.apiCall(environment.endpoint[this.dataEndPoints[this.type]]).subscribe((data) => {
      // Print out when shit hits the fan
      if (!data || data.state !== 'success') {
        this.error = {
          "message": data.message
        };
      }
      this.data = data.data;
    });
  }

  activate(id) {
    if (!id) return false;

    this.TRS.apiCall(environment.endpoint['user-activate'], { "id": id }).subscribe((data) => {
      if (!data || data.state !== 'success') {
        this.error = {
          "message": data.message
        };
        return false;
      }
      this.getData();
    });
  }

  deactivate(id) {
    if (!id) return false;

    this.TRS.apiCall(environment.endpoint['user-deactivate'], { "id": id }).subscribe((data) => {
      if (!data || data.state !== 'success') {
        this.error = {
          "message": data.message
        };
        return false;
      }
      this.getData();
    });
  }

  ngOnDestroy() {
    if (this.subRoute) this.subRoute.unsubscribe();
    if (this.subAuth) this.subAuth.unsubscribe();
  }
}
