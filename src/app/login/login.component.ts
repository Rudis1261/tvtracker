import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	@Output() onCloseModal = new EventEmitter<boolean>();
	error: any;
  authProvider: any;
  loginDetails: any;
  loggingIn: boolean = false;
  action: string = "Login";

  constructor() {
  	this.error = false;
  	this.loginDetails = {
      'email': "",
      'password': ""
    };
  }

  onSubmit(form) {
   	this.error = false;
    if (this.loginDetails['email'] == "" || this.loginDetails['password'] == "") {
      return false;
    }

    this.loggingIn = true;
    this.action = "Logging in";

    // this.af.auth.login({
    //   email: this.loginDetails['email'],
    //   password: this.loginDetails['password']
    // }).then(
    //   (success) => {
    //   this.loginResp('success', success)
    // }).catch(
    //   (err) => {
    //   this.loginResp('err', err)
    // });
  }

  loginResp(state, resp) {
    console.log("LOGIN State:", state, "RESP:", resp);
    if (state == 'err') {
      this.error = resp;
      console.error(resp);
    }
    if (state == 'success') {
    	this.onCloseModal.emit(true);
      console.log("Welcome back sir");
      window.location.reload();
    }
    this.action = "Login";
    this.loggingIn = false;
  }

  ngOnInit() {}
}
