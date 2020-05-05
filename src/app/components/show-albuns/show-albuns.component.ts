import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AlbumModel} from '../../models/album.model';
import {HttpClient} from '@angular/common/http';
import {last} from 'rxjs/operators';

@Component({
  selector: 'app-show-albuns',
  templateUrl: './show-albuns.component.html',
  styleUrls: ['./show-albuns.component.scss']
})
export class ShowAlbunsComponent implements OnInit, OnChanges {

  nAlbuns: any = [];
  title: Title = Title.lastTitle;
  @Input() search: boolean;
  @Input() albums: AlbumModel[];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (((window.innerHeight + window.scrollY + 1) >=
      document.body.offsetHeight) || ((window.innerHeight + document.documentElement.scrollTop)
      >= document.body.offsetHeight)) {
      console.log('final');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.albums ? this.nAlbuns = changes.albums.currentValue : '';
    changes.search ? this.search = changes.search.currentValue : '';
    this.search ? this.title = Title.searchTtile : this.title = Title.lastTitle;
  }
  ngOnInit(): void {
  }

}

enum Title {
  lastTitle = 'Álbuns buscados recentementes',
  searchTtile = 'Resultados encontrados para '
}
