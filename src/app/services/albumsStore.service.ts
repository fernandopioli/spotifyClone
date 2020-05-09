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

  get getSearchedKeyword(): string{
    return this.searchedKeyword;
  }

  set setSearchedKeyword(keyword: string){
    this.searchedKeyword = keyword;
  }

  get getAlbuns(): Subject<AlbumModel[]> {
    return this.allAlbunsStore$;
  }

  add(albuns: AlbumModel[]): void {
      this.albunsStates = this.albunsStates.concat(albuns);
      this.getAlbuns.next(this.albunsStates);

  }
  clear(): void {
    this.albunsStates = [];
    this.allAlbunsStore$.next(this.albunsStates);
  }

}
