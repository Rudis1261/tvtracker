import { Inject, Injectable } from "@angular/core";
import { FirebaseApp } from "angularfire2";
import { TokenRingService } from "./token-ring.service";
import * as firebase from 'firebase';

declare var window: any;

@Injectable()
export class FcmService {
  private _messaging: firebase.messaging.Messaging;

  constructor(@Inject(FirebaseApp) private _firebaseApp: firebase.app.App, private TRS: TokenRingService) {

    // It's only available for Devices with Notifications API
    if (window.hasOwnProperty('Notification')) {
      this._messaging = firebase.messaging(this._firebaseApp);
      this._messaging.requestPermission()
        .then(success => {
          console.log("Permission Granted", success);
          this.getToken('New Token');
        })
        .catch(error => {
          console.error("Notifications disabled", error);
          this.clearToken();
        });

      this._messaging.onTokenRefresh(() => {
        this.getToken('Refreshed Token');
      });

      this._messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
      });
    }
  }

  setToken(token) {
    this.TRS.setFCMToken(token);
  }

  clearToken() {
    this.TRS.removeFCMToken();
  }

  getToken(type) {
    this._messaging.getToken()
      .then((token) => {
        if (token) {
          console.log('FCM', type, token);
          this.setToken(token);
        } else {
          console.log('FCM', 'No Instance ID token available. Request permission to generate one.');
          this.clearToken();
        }
      })
      .catch((err) => {
        console.log('FCM', 'An error occurred while retrieving token. ', err);
        this.clearToken();
      });
  }
}
