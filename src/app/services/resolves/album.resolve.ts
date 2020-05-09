import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {from, of} from 'rxjs';
import {AlbumLocalStorageService} from '../albumLocalStorage.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class AlbumResolve implements Resolve<any> {

  baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private albumLocalStorageService: AlbumLocalStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const id = route.paramMap.get('id');
    const album = this.albumLocalStorageService.getAlbuns.filter(data => {
      if (data.id === id){
        return data;
      }
    });
    if (album.length > 0){
      return of(album[0]);
    } else{
      return this.http.get(`${this.baseUrl}albums/${id}`)
        .pipe(
          catchError(err => {
            this.router.navigate(['/home']);
            return from([]);
          }));
    }
  }
}
