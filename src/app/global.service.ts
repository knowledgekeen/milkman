import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  serverpath: string = null;
  private subject = new Subject<any>();

  constructor() {
    if (window.location.hostname == "localhost") {
      if (window.location.port == "") {
        // For Xampp n All
        this.serverpath = "./assets/db/";
      } else {
        this.serverpath =
          "http://localhost/Projects/Assasa_Projects/milkman/src/assets/db/";
      }
    } else {
      this.serverpath = "./assets/db/";
    }
  }

  setNavStatus(message: boolean) {
    this.subject.next({ status: message });
  }

  clearNavStatus() {
    this.subject.next();
  }

  getNavStatus(): Observable<any> {
    return this.subject.asObservable();
  }
}
