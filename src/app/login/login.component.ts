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
  success: any = false;
  errorTimeout: any;
  loginDetails: any;
  registerDetails: any;
  forgotDetails: any;
  loggingIn: boolean = false;
  registering: boolean = false;
  submitting: boolean = false;
  action: String = 'Login';
  actions: Array<String> = ['Login', 'Register'];

  registerActionLabel: String = 'Register';
  loginActionLabel: String = 'Login';
  forgotActionLabel: String = 'Reset Password';

  //modalTitle = "Login";
  recaptcha: any = false;
  recapchaKey: String = ENV.recapchaKey;
  loginCaptcha: any;
  registerCaptcha: any;
  loginCaptchaId: any;
  registerCaptchaId: any;
  forgotCaptcha: any;
  forgotCaptchaId: any;

  constructor(private Auth: AuthService, private LS: LoadscriptService) {
  	this.error = false;
    this.success = false;

  	this.loginDetails = {
      'email': "",
      'password': ""
    };

    this.registerDetails = {
      'username': "",
      'email': "",
      'password': "",
      'confirm': ""
    };

    this.forgotDetails = {
      'email': ""
    };

    this.LS.loadScript(ENV.recaptchaScript, 'js', () => {
      this.recaptcha = true;
      this.pollCaptchaReady();
    });
  }

  pollCaptchaReady() {
    if (window.hasOwnProperty('grecaptcha') && window.grecaptcha.hasOwnProperty('render')) {
      return this.initCaptchas();
    }

    setTimeout(() => {
      this.pollCaptchaReady();
    }, 30);
  }

  initCaptchas() {
    this.loginCaptchaId = grecaptcha.render('login-captcha', {
      'sitekey': this.recapchaKey,
      'callback': (data) => {
        this.loginCaptcha = data;
        this.error = false;
      },
      'expired-callback': () => {
        this.loginCaptcha = false;
      }
    });

    this.registerCaptchaId = grecaptcha.render('register-captcha', {
      'sitekey': this.recapchaKey,
      'callback': (data) => {
        this.registerCaptcha = data;
        this.error = false;
      },
      'expired-callback': () => {
        this.registerCaptcha = false;
      }
    });

    this.forgotCaptchaId = grecaptcha.render('forgot-captcha', {
      'sitekey': this.recapchaKey,
      'callback': (data) => {
        this.forgotCaptcha = data;
        this.error = false;
      },
      'expired-callback': () => {
        this.forgotCaptcha = false;
      }
    });
  }

  toggleAction(action) {
    grecaptcha.reset(this.loginCaptchaId);
    grecaptcha.reset(this.registerCaptchaId);
    this.error = false;
    this.action = action;
  }

  forgotPassword(email) {
    this.action = 'Forgot';
    this.forgotDetails = {
      'email': email || ''
    }
  }

  randomName() {
    let names = [
      'Bouncy', 'Quick', 'Foxy', 'Legend', 'Captain', 'Private',
      'Jumping', 'Unicorn', 'Juniper', 'Balista', 'SuperNova',
      'Kitty', 'Doggy', 'Fray', 'Freak', 'Sergeant', 'Candy',
      'Proxima', 'Super', 'Doctor', 'TheMagicSeaLion', 'Blinky',
      'LizzardWizzard', 'PeterPan', 'SellyMeNelly', 'Unique',
      'SuperLimaBean', 'CptAmerica', 'BouncingBetty', 'SkaterBoy',
      'Gamer', 'DuctTape', 'L33t', 'Hacker'
    ];
    let name = names[Math.floor(Math.random() * names.length)];
    let number = Math.floor(Math.random() * 9000) + 1000;
    this.registerDetails['username'] = name + '#' + number;
  }

  setError(msg) {
    if (!msg) {
      return false;
    }

    clearTimeout(this.errorTimeout);
    this.error = msg;
    this.errorTimeout = setTimeout(() => {
      this.error = false;
    }, 4000);
  }

  login(form) {
    this.loggingIn = true;
    let labelBefore = this.loginActionLabel;
    this.loginActionLabel = "Logging in";
    this.Auth.login(this.loginDetails['email'], this.loginDetails['password'], this.loginCaptcha).subscribe(
      resp => {
        if (resp.state == 'failure') {
          grecaptcha.reset(this.loginCaptchaId);
          this.setError(resp);
        }

        if (resp.state == 'success') {
          this.success = resp;
          setTimeout(() => {
            this.onCloseModal.emit(true);
            setTimeout(() => {
              this.success = false;
              this.error = false;
              grecaptcha.reset(this.loginCaptchaId);
            }, 500);
          }, 4000);
        }

        this.loginActionLabel = labelBefore;
        this.loggingIn = false;
      },
      err => {
        // Catch them API Errors
        grecaptcha.reset(this.loginCaptchaId);
        this.loggingIn = false;
        this.loginActionLabel = labelBefore;
        this.setError({
          'message': 'Oops something went wrong, please try again later'
        });
      }
    );
  }

  register(form) {
    let labelBefore = this.registerActionLabel;
    let username = this.registerDetails['username'] || false;
    let password = this.registerDetails['password'] || false;
    let email = this.registerDetails['email'] || false;
    let confirm = this.registerDetails['confirm'] || false;

    this.registering = true;
    this.registerActionLabel = "Registering";

    this.Auth.register(username, password, email, confirm, this.registerCaptcha).subscribe(
      resp => {
        if (resp.state == 'failure') {
          grecaptcha.reset(this.registerCaptchaId);
          this.setError(resp);
        }

        if (resp.state == 'success') {
          this.success = resp;
          setTimeout(() => {
            this.onCloseModal.emit(true);
            setTimeout(() => {
              this.success = false;
              this.error = false;
              grecaptcha.reset(this.registerCaptchaId);
              this.action = 'Login';
            }, 500);
          }, 10000);
        }

        this.registerActionLabel = labelBefore;
        this.registering = false;
      },
      err => {

        // Catch them API Errors
        grecaptcha.reset(this.registerCaptchaId);
        this.registering = false;
        this.registerActionLabel = labelBefore;
        this.setError({
          'message': 'Oops something went wrong, please try again later'
        });
      }
    );
  }

  forgot(form) {
    let labelBefore = this.forgotActionLabel;
    let email = this.forgotDetails['email'] || false;

    this.submitting = true;
    this.forgotActionLabel = "Requesting";

    this.Auth.resetPassword(email, this.forgotCaptcha).subscribe(
      resp => {
        if (resp.state == 'failure') {
          grecaptcha.reset(this.forgotCaptchaId);
          this.setError(resp);
        }

        if (resp.state == 'success') {
          this.success = resp;
          setTimeout(() => {
            this.onCloseModal.emit(true);
            setTimeout(() => {
              this.success = false;
              this.error = false;
              grecaptcha.reset(this.forgotCaptchaId);
              this.action = 'Login';
            }, 500);
          }, 10000);
        }

        this.forgotActionLabel = labelBefore;
        this.submitting = false;
      },
      err => {
        grecaptcha.reset(this.forgotCaptchaId);
        this.submitting = false;
        this.forgotActionLabel = labelBefore;
        this.setError({
          'message': 'Oops something went wrong, please try again later'
        });
      }
    );
  }

  onSubmit(form, type) {
    this.error = false;

    if (type == 'forgot') {
      if (this.submitting) return false;
      return this.forgot(form);
    }

    if (type == 'register') {
      if (this.registering) return false;
      return this.register(form);
    }

    if (type == 'login') {
      if (this.loggingIn) return false;
      return this.login(form);
    }
  }

  ngOnInit() {}
}
