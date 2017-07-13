import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { environment as ENV } from "../../environments/environment";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private headers: Headers;
  private options: RequestOptions;
  public user: any;

  constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem('user')) || false;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });

    console.log("USER", this.user);
  }

  login(username: String, password: String) {
    if (this.user) {
      Observable.of(this.user);
      return Observable.of(this.user);
    }

    return this.http.post(
      ENV.authEndPoint, {
        'username': username,
        'password': password
      },
      this.options
    )
    .map((res:Response) => {
      let data = res.json();
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      return data;
    })
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  getAuth() {
    return Observable.of(this.user);
  }

  logout() {
    this.user = false;
    localStorage.removeItem('user');

    console.log(ENV.logoutEndPoint);
    return this.http.get(
      ENV.logoutEndPoint,
      this.options
    )
    .map((res:Response) => {
      console.log("LOGOUT RESPONSE", res);
      let data = res.json()
      this.user = false;
      localStorage.removeItem('user');
    })
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  testApi() {
    return this.http.get(
      ENV.apiEndPoint,
      this.options
    )
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
