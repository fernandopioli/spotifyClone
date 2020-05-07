import {Component, HostListener, OnInit} from '@angular/core';
import {AlbumsStore} from '../../services/albumsStore.service';
import {AlbumModel} from '../../models/album.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-show-albuns',
  templateUrl: './show-albuns.component.html',
  styleUrls: ['./show-albuns.component.scss']
})
export class ShowAlbunsComponent implements OnInit {

  albuns: AlbumModel[] = [];
  title: Title = Title.lastTitle;

  constructor(private albumsStore: AlbumsStore) { }

  ngOnInit(): void {
    this.albumsStore.getAlbuns.subscribe((data: AlbumModel[]) => {
      data.length > 0 ? this.title = Title.searchTtile : this.title = Title.lastTitle;
      this.albuns = data;
    });
  }

}

enum Title {
  lastTitle = 'Álbuns buscados recentementes',
  searchTtile = 'Resultados encontrados para '
}
