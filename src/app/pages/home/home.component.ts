import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AlbumModel} from '../../models/album.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  nAlbums: AlbumModel[] = [];

  ngOnInit(): void {

  }

  setAlbuns(event: AlbumModel[]){
    this.nAlbums = event;
  }

}
