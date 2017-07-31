import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { environment as ENV } from "../../environments/environment";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { TokenRingService } from "./token-ring.service"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private options: RequestOptions;
  public token: any;
  public tokenSub: any;
  public user: any;
  public userState = new BehaviorSubject(null);

  constructor(private http: Http, private trs: TokenRingService) {
    this.user = JSON.parse(localStorage.getItem('user')) || false;
    this.options = this.trs.getHeaders();
    this.userState.next(this.user);
    this.tokenSub = this.trs.apiToken.subscribe((data) => {
      this.token = data;
    });
  }

  ngOnDestroy() {
    if (this.tokenSub) this.tokenSub.unsubscribe();
  }

  login(username: String, password: String, captcha: String) {
    if (this.user) {
      Observable.of(this.user);
      return Observable.of(this.user);
    }

    this.trs.getHeaders();

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
      this.trs.setToken(data.data.token);
      this.userState.next(this.user);
      return data;
    })
    .catch((error:any) => this.trs.errorHandler(error));
  }

  newPassword(password: String, confirm: String, code: String) {
    this.trs.getHeaders()

    return this.http.post(
      ENV.newPasswordEndPoint, {
        'password': password,
        'confirm': confirm,
        'code': code
      },
      this.options
    )
    .map((res:Response) => {
      let data = res.json();
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.trs.setToken(data.data.token);
      this.userState.next(this.user);
      return data;
    })
    .catch((error:any) => this.trs.errorHandler(error));
  }

  register(username: String, password: String, email: String, confirm: String, captcha: String) {
    this.trs.getHeaders();

    return this.http.post(
      ENV.registerEndPoint, {
        'username': username,
        'password': password,
        'email': email,
        'confirm': confirm,
        'captcha': captcha
      },
      this.options
    )
    .map((res:Response) => {
      let data = res.json();
      return data;
    })
    .catch((error:any) => this.trs.errorHandler(error));
  }

  logout() {
    this.trs.getHeaders()
    this.trs.setToken(false);
    this.user = false;
    localStorage.removeItem('user');

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
    .catch((error:any) => this.trs.errorHandler(error));
  }

  activate(email: String, code: String) {
    this.trs.getHeaders();

    return this.http.post(
      ENV.activateEndPoint, {
        'email': email,
        'code': code
      },
      this.options
    )
    .map((res:Response) => {
      let data = res.json();
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.trs.setToken(data.data.token);
      this.userState.next(this.user);
      return data;
    })
    .catch((error:any) => this.trs.errorHandler(error));
  }

  resetPassword(email: String, captcha: String) {
    this.trs.getHeaders();

    return this.http.post(
      ENV.resetPasswordEndPoint, {
        'email': email,
        'captcha': captcha
      },
      this.options
    )
    .map((res:Response) => {
      let data = res.json();
      return data;
    })
    .catch((error:any) => this.trs.errorHandler(error));
  }

  testApi() {
    this.trs.getHeaders();
    return this.http.get(
      ENV.apiEndPoint,
      this.options
    )
    .map((res:Response) => res.json())
    .catch((error:any) => this.trs.errorHandler(error));
  }
}
