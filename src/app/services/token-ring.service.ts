import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { environment as ENV } from "../../environments/environment";

@Injectable()
export class TokenRingService {

  private headers: Headers;
  private options: RequestOptions;
  public token: any = localStorage.getItem('token') || false;
  public apiToken = new BehaviorSubject(null);

  constructor(private http: Http) {
    this.token = localStorage.getItem('token') || false;
    this.apiToken.next(this.token);
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;

    if (token == false) {
      localStorage.removeItem('token');
      this.apiToken.next(false);
    } else {
      localStorage.setItem('token', token || false);
      this.apiToken.next([...token]);
    }
  }

  getHeaders() {
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

    return this.options;
  }

  apiCall(url, params) {
    this.options = this.getHeaders();
    return this.http.post(url, params,this.options)
                    .map((res:Response) => {
                      return res.json();
                    })
                    .catch((error:any) => this.errorHandler(error));
  }

  errorHandler(res) {
    console.error(res);
    return Observable.throw({
      'message': 'Server error, try again later'
    });
  }
}
