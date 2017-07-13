import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

type LoginParams = {
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginForm: LoginParams = {username:'', password: ''};
  user: any;

  constructor(private auth: AuthService) {
    this.auth.testApi().subscribe((data) => {
      console.log("TEST API", data);
    });

    this.auth.getAuth().subscribe({
      next: (data) => {
        console.log("GetAuth", data);
        this.user = data;
      }
    });
  }

  login(username, password) {
    this.auth.login(username, password).subscribe((data) => {
      if (data.state == "failure") {
        alert(data.message);
      } else {
        this.user = data.user;
      }
    });
  }

  logout() {
    this.auth.logout().subscribe((data) => {
      this.user = false;
    });
  }

  ngOnInit() {
  }

}
