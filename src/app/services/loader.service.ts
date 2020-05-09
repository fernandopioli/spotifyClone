import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: Subject<boolean> = new BehaviorSubject(false);
  constructor() { }

  get loadingState(): Subject<boolean>  {
    return this.isLoading;
  }

  show(): void {
    this.isLoading.next(true);
  }
  hide(): void {
    this.isLoading.next(false);
  }

}
