import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private Auth: AuthService) {
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
  }

  toggleAction(action) {
    this.action = action;
  }

  login(form) {
    this.loggingIn = true;
    let labelBefore = this.loginActionLabel;
    this.loginActionLabel = "Logging in";
    this.Auth.login(this.loginDetails['email'], this.loginDetails['password']).subscribe(
      resp => {
        if (resp.state == 'failure') {
          this.error = resp;
        }

        if (resp.state == 'success') {
          this.onCloseModal.emit(true);
        }

        this.loginActionLabel = labelBefore;
        this.loggingIn = false;
      }, 
      err => { 
        // Catch them API Errors
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
