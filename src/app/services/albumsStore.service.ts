import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {AlbumModel} from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsStore {

  private allAlbunsStore$: Subject<AlbumModel[]>;
  private albunsStates: AlbumModel[] = [];
  private searchedKeyword = '';

  constructor() {
    this.allAlbunsStore$ = new BehaviorSubject(this.albunsStates);
  }

  get getSearchedKeyword(){
    return this.searchedKeyword;
  }

  set setSearchedKeyword(keyword: string){
    this.searchedKeyword = keyword;
  }

  get getAlbuns() {
    return this.allAlbunsStore$;
  }

  add(albuns: AlbumModel[]): void {
    if (albuns.length === 0) {
      this.clear();
    }else
    {
      this.albunsStates = this.albunsStates.concat(albuns);
     // const newState = Object.assign({}, this.albunsStates);
      this.getAlbuns.next(this.albunsStates);
    }
  }
  clear(): void {
    this.albunsStates = [];
    this.allAlbunsStore$.next(this.albunsStates);
  }

}
