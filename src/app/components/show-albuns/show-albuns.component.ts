import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AlbumModel} from '../../models/album.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-show-albuns',
  templateUrl: './show-albuns.component.html',
  styleUrls: ['./show-albuns.component.scss']
})
export class ShowAlbunsComponent implements OnInit, OnChanges {

  nAlbuns: any = [];
  @Input() albums: AlbumModel[];

  ngOnChanges(changes: SimpleChanges) {
    this.nAlbuns = changes.albums.currentValue;
  }
  ngOnInit(): void {
  }

}
