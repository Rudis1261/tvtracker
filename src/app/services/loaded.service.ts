import { Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class LoadedService {

  constructor() { }

  waitForLoad(testFor, callback=null) {
    setTimeout(() => {
      if (!window.hasOwnProperty(testFor)) {
        return this.waitForLoad(testFor, callback);
      }
      return callback();
    }, 100);
  }
}
