import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { LoadscriptService } from '../../services/loadscript.service';
import { AuthService } from '../../services/auth.service';
import { environment as ENV } from "../../../environments/environment";

declare var grecaptcha: any;
declare var window: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  error: any = false;
  success: any = false;
  submitting: any = false;
  user: any = false;
  formData: any;
  actionLabel: String = 'Contact';

  recaptcha: any = false;
  recapchaKey: String = ENV.recapchaKey;
  contactCaptcha: any;
  contactCaptchaId: any;

  submitSub: any;
  authSub: any;

  constructor(private CS: ContactService, private LS: LoadscriptService, private Auth: AuthService) { 
    this.formData = {
      'email': "",
      'description': ""
    };

    this.LS.loadScript(ENV.recaptchaScript, 'js', () => {
      this.recaptcha = true;
      this.pollCaptchaReady();
    });

    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
      if (value !== false) {
        this.formData['email'] = value.email;
      }
      console.log("USER", value);
    });
  }

  ngOnDestroy() {
    if (this.submitSub) this.submitSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
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
    this.contactCaptcha = grecaptcha.render('contact-captcha', {
      'sitekey': this.recapchaKey,
      'callback': (data) => {
        this.contactCaptcha = data;
        this.error = false;
      },
      'expired-callback': () => {
        this.contactCaptcha = false;
      }
    });
  }

  onSubmit(form) {
    if (this.submitting) return false;
    this.submitting = true;

    this.error = false;
    this.success = false;

    this.submitSub = this.CS.contact(this.formData.email, this.formData.description, this.contactCaptcha).subscribe(data => {
      if (data.state == 'failure') {
        this.error = data;
      } else {
        this.success = data;
      }
      this.submitting = false;
    }, err => {
      this.error = err;
      this.submitting = false;
    });
  }
}