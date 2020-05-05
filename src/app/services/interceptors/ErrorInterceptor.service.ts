import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401 && err.error.error.message === 'The access token expired') {
        this.authenticationService.logout();
        this.router.navigate(['/login'], { queryParams: { refresh: true} });
      }
      if (
        err.status === 401 &&
        err.error.error.message === 'Invalid access token'
      ) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }

      return throwError(err);
    }));
  }
}
