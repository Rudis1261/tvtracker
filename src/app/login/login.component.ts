import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment as ENV } from "../../environments/environment";
import { LoadscriptService } from '../services/loadscript.service';

declare var grecaptcha: any;
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	@Output() onCloseModal = new EventEmitter<boolean>();
	error: any;
  loginDetails: any;
  registerDetails: any;
  loggingIn: boolean = false;
  registering: boolean = false;
  action: String = 'Login';
  actions: Array<String> = ['Login', 'Register'];
  registerActionLabel: String = 'Register';
  loginActionLabel: String = 'Login';
  modalTitle = "Login";

  recaptcha: any = false;
  recapchaKey: String = ENV.recapchaKey;

  constructor(private Auth: AuthService, private LS: LoadscriptService) {
  	this.error = false;
  	this.loginDetails = {
      'email': "",
      'password': ""
    };

    this.registerDetails = {
      'email': "",
      'password': "",
      'confirm': ""
    };

    this.LS.loadScript(ENV.recaptchaScript, 'js', () => {
      this.recaptcha = true;

      setTimeout(() => {
        grecaptcha.render('login-captcha', {
          'sitekey' : this.recapchaKey,
          'callback' : (data) => {
            this.error = false;
          }
        });
      }, 500);
    });
  }

  toggleAction(action) {
    this.action = action;
  }

  login(form) {
    this.loggingIn = true;
    let labelBefore = this.loginActionLabel;
    let captcha = grecaptcha.getResponse();
    this.loginActionLabel = "Logging in";
    this.Auth.login(this.loginDetails['email'], this.loginDetails['password'], captcha).subscribe(
      resp => {
        if (resp.state == 'failure') {
          grecaptcha.reset();
          this.error = resp;
        }

        if (resp.state == 'success') {
          this.onCloseModal.emit(true);
        }

        this.loginActionLabel = labelBefore;
        this.loggingIn = false;
      },
      err => {

        console.log("LOGING FAILED", err);

        // Catch them API Errors
        grecaptcha.reset();
        this.loggingIn = false;
        this.loginActionLabel = labelBefore;
        this.error = {
          'message': 'Oops something went wrong, please try again later'
        };
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    );
  }

  onSubmit(form, type) {
    this.error = false;

    if (type == 'register') {
      this.error = {
        'message': 'Registration currently disabled'
      };
      setTimeout(() => {
        this.error = false;
      }, 5000);
      console.log("REGISTER Disabled");
      return false;
    }

    if (type == 'login') {
      if (this.loggingIn) return false;
      return this.login(form);
    }
  }

  ngOnInit() {}
}
