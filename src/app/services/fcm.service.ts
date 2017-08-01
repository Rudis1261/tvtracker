import { Inject, Injectable } from "@angular/core";
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase';

@Injectable()
export class FcmService {
  private _messaging: firebase.messaging.Messaging;

  constructor(@Inject(FirebaseApp) private _firebaseApp: firebase.app.App) {

    this._messaging = firebase.messaging(this._firebaseApp);
    this._messaging.requestPermission()
      .then(success => {
        console.log("Permission Granted", success);
        this.getToken('New Token');
      })
      .catch(error => { 
        console.error("Notifications disabled", error);
        this.clear();
      });

    this._messaging.onTokenRefresh(() => {
      this.getToken('Refreshed Token');
    });

    this._messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
    });
  }

  setToken(token) {
    localStorage.setItem('fcm_token', token);
  }

  clear() {
    localStorage.removeItem('fcm_token');
  }

  getToken(type) {
    this._messaging.getToken()
      .then((token) => {
        if (token) {
          console.log('FCM', type, token);
          this.setToken(token);
        } else {
          console.log('FCM', 'No Instance ID token available. Request permission to generate one.');
          this.clear();
        }
      })
      .catch((err) => {
        console.log('FCM', 'An error occurred while retrieving token. ', err);
        this.clear();
      });
  }
}