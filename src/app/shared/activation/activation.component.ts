import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  loading: boolean = true;
  params: any;
  redirectingIn: any = false;
  error: any = false;
  success: any = false;

  private activationSub: any;
  private routingSub: any;

  constructor(private route: ActivatedRoute, private router: Router, private Auth: AuthService) {
    this.routingSub = this.route.params.subscribe(params => {
      this.params = params;

      if (params && params.email && params.code) {
        this.Auth.activate(this.params.email, this.params.code).subscribe(
        resp => {
          this.loading = false;
          if (resp.state == 'failure') {
            this.error = resp;
          }

          if (resp.state == 'success') {
            this.success = resp;
            this.redirectToHome(3);
          }
        },
        err => {
          this.loading = false;
          this.error = {
            'message': 'Oops something went wrong, please try again later'
          };
        });
      } else {
        this.loading = false;
      }
    });
  }

  redirectToHome(time){
    this.redirectingIn = time;
    time = time - 1;
    if (time >= 0) {
      setTimeout(() => {
        return this.redirectToHome(time);
      }, 1000);
    } else {
      this.router.navigate([ '/home' ]);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.routingSub) this.routingSub.unsubscribe();
    if (this.activationSub) this.activationSub.unsubscribe();
  }
}
