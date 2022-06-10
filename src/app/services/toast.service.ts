import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastMessageSubject: Subject<any> = new Subject<any>();

  constructor() { }

  getToastMessages(): Observable<any> {
    return this.toastMessageSubject.asObservable();
  }

  setToastMessages(messageToast: string, classToast: string): void {
    this.toastMessageSubject.next({
      messageToast,
      classToast
    })
  }

}
