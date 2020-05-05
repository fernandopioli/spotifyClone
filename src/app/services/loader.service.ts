import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: Subject<boolean> = new BehaviorSubject(false);
  constructor() { }

  get loadingState() {
    return this.isLoading;
  }

  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }

}
