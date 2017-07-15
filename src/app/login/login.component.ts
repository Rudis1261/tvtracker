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
  loggingIn: boolean = false;
  action: string = "Login";

  constructor(private Auth: AuthService) {
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
