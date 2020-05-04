import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(token: string) {
   localStorage.setItem('token', JSON.stringify(token));
   return this.http.get('https://api.spotify.com/v1/me')
      .pipe(
        map((data: UserModel) => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /* refresh_token() {
    return this.http.post('https://accounts.spotify.com/api/token',
      { grant_type: 'refresh_token', refresh_token: JSON.parse(localStorage.getItem('refresh_token'))})
      .pipe(
        map((data: any) => {
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data.access_token));
          localStorage.setItem('refresh_token', JSON.stringify(data.refresh_token));
          this.currentUserSubject.next(data);
          return data;
        }));
  }*/
}
