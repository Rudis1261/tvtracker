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
      'repeat': ""
    };
  }

  toggleAction(action) {
    this.action = action;
  }

  onSubmit(form, type) {
    console.log("SUBMIT", form, "LOGIN", this.loginDetails, "REGI", this.registerDetails);
    if (type == 'register') {
      console.log("REGISTER, ABORT");
      return false;
    }

   	this.error = false;
    if (this.loginDetails['email'] == "" || this.loginDetails['password'] == "") {
      return false;
    }

    this.loggingIn = true;
    this.action = "Logging in";

    this.Auth.login(this.loginDetails['email'], this.loginDetails['password']).subscribe(resp => {

      if (resp.state == 'failure') {
        this.error = resp;
        console.error(resp);
      }

      if (resp.state == 'success') {
        this.onCloseModal.emit(true);
      }

      this.action = "Login";
      this.loggingIn = false;
    });
  }

  ngOnInit() {}
}
