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
  public userState = new BehaviorSubject(null);

  constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem('user')) || false;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });

    this.userState.next(this.user);
  }

  login(username: String, password: String, captcha: String) {
    if (this.user) {
      Observable.of(this.user);
      return Observable.of(this.user);
    }

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
    this.user = false;
    localStorage.removeItem('user');

    //console.log(ENV.logoutEndPoint);
    return this.http.delete(
      ENV.logoutEndPoint,
      this.options
    )
    .map((res:Response) => {
      //console.log("LOGOUT RESPONSE", res);
      let data = res.json()
      this.user = false;
      localStorage.removeItem('user');
      this.userState.next(this.user);
      return this.user;
    })
    .catch((error:any) => this.errorHandler(error));
  }

  testApi() {
    return this.http.get(
      ENV.apiEndPoint,
      this.options
    )
    .map((res:Response) => res.json())
    .catch((error:any) => this.errorHandler(error));
  }
}
