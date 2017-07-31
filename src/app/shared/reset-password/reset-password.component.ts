import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  params: any;
  redirectingIn: any = false;
  error: any = false;
  success: any = false;
  submitting: any = false;
  passwordDetails: any;
  newPasswordLabel: String = 'Update Password';

  private newPasswordSub: any;
  private routingSub: any;

  constructor(private route: ActivatedRoute, private router: Router, private Auth: AuthService) {

    this.passwordDetails = {
      'password': "",
      'confirm': "",
      'code': ""
    };

    this.routingSub = this.route.params.subscribe(params => {
      this.params = params;
      if (!params || !params.code) {
        this.router.navigate([ '/404' ]);
      }

      this.passwordDetails.code = params.code;
    });
  }

  onSubmit(form) {
    this.error = false;
    this.success = false;

    if (form.invalid || this.submitting) {
      return false;
    }

    this.submitting = true;
    let password = this.passwordDetails.password;
    let confirm = this.passwordDetails.confirm;
    let code = this.passwordDetails.code;

    this.newPasswordSub = this.Auth.newPassword(password, confirm, code).subscribe(
      resp => {
        this.submitting = false;
        if (resp.state == 'failure') {
          return this.error = resp;
        }

        if (resp.state == 'success') {
          this.success = resp;
          this.redirectToHome(10);
        }
      },
      err => {
        this.submitting = false;
        this.error = {
          'message': 'Oops something went wrong, please try again later'
        };
      });
  }

  ngOnInit() {}

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

  ngOnDestroy() {
    if (this.routingSub) this.routingSub.unsubscribe();
    if (this.newPasswordSub) this.newPasswordSub.unsubscribe();
  }
}
