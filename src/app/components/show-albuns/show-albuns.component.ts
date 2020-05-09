import {Component, OnInit} from '@angular/core';
import {AlbumsStore} from '../../services/albumsStore.service';
import {AlbumModel} from '../../models/album.model';
import {AlbumLocalStorageService} from '../../services/albumLocalStorage.service';

@Component({
  selector: 'app-show-albuns',
  templateUrl: './show-albuns.component.html',
  styleUrls: ['./show-albuns.component.scss']
})
export class ShowAlbunsComponent implements OnInit {

  albuns: AlbumModel[] = [];
  title: Title = Title.lastTitle;

  constructor(private albumsStore: AlbumsStore, private albumsLocal: AlbumLocalStorageService) { }

  ngOnInit(): void {
    this.albumsStore.getAlbuns.subscribe((data: AlbumModel[]) => {
      if (data.length > 0){
        this.title = Title.searchTtile;
        this.albuns = data;
      }else{
        this.title = Title.lastTitle;
        this.albuns = this.albumsLocal.getAlbuns;
      }
    });
  }

}

enum Title {
  lastTitle = 'Álbuns buscados recentementes',
  searchTtile = 'Resultados encontrados para '
}
