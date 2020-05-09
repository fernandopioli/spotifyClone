import { Injectable } from '@angular/core';
import {AlbumModel} from '../models/album.model';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumLocalStorageService {

  private albuns: AlbumModel[] = [];

  constructor() {
  }

  get getAlbuns(): AlbumModel[] {
    const albums = localStorage.getItem('lastAlbums');
    if (albums){
      return JSON.parse(albums);
    }else{
      return [];
    }
  }

  add(album: AlbumModel): void {
    const albums = this.getAlbuns;

    const hasData = albums.filter(data => {
      if (data.id === album.id){
        return data;
      }
    });
    if (hasData.length === 0){
      if (albums.length > 19){
        albums.shift();
      }
      albums.push(album);
      localStorage.setItem('lastAlbums', JSON.stringify(albums));
    }
  }

}
