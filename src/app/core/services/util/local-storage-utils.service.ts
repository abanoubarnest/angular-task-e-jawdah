
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUtilsService {

  constructor() { }
  valueSetSubject = new Subject();

  setItem(key:any, value:any) {
    // debugger
    let temp :any= new Object();
    temp['key'] = key;
    temp['value'] = value;
    localStorage.setItem(key, value);
    this.valueSetSubject.next(temp);
  }
  localStorageSubscriber() {
    return this.valueSetSubject.asObservable();
  }
}
