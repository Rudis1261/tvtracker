import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { environment as ENV } from "../../environments/environment";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private headers: Headers;
  private options: RequestOptions;
  public user: any;
  public token: any;
  public userState = new BehaviorSubject(null);

  constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem('user')) || false;
    this.token = localStorage.getItem('token') || false;
    this.getHeaders();
    this.userState.next(this.user);
  }

  getHeaders() {
    console.log(this);
    if (this.token && this.token !== false) {
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
    } else {
      this.headers = new Headers({
        'Content-Type': 'application/json'
      });
    }

    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });
  }

  login(username: String, password: String, captcha: String) {
    if (this.user) {
      Observable.of(this.user);
      return Observable.of(this.user);
    }

    this.getHeaders();

    return this.http.post(
      ENV.authEndPoint, {
        'username': username,
        'password': password,
        'captcha': captcha
      },
      this.options
    )
    .map((res:Response) => {
      let data = res.json();
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', data.data.token || false);
      this.userState.next(this.user);
      return data;
    })
    .catch((error:any) => this.errorHandler(error));
  }

  errorHandler(res) {
    console.log("API CATCH ERROR");
    return Observable.throw(res || 'Server error');
  }

  logout() {
    this.getHeaders();
    this.user = false;
    this.token = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    return this.http.get(
      ENV.logoutEndPoint,
      this.options
    )
    .map((res:Response) => {
      let data = res.json()
      this.user = false;
      this.userState.next(this.user);
      return this.user;
    })
    .catch((error:any) => this.errorHandler(error));
  }

  testApi() {
    this.getHeaders();
    return this.http.get(
      ENV.apiEndPoint,
      this.options
    )
    .map((res:Response) => res.json())
    .catch((error:any) => this.errorHandler(error));
  }
}
