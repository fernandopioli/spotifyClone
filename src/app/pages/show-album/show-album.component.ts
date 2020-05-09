import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AlbumModel} from '../../models/album.model';
import { Location } from '@angular/common';
import {AlbumLocalStorageService} from '../../services/albumLocalStorage.service';

@Component({
  selector: 'app-show-album',
  templateUrl: './show-album.component.html',
  styleUrls: ['./show-album.component.scss']
})
export class ShowAlbumComponent implements OnInit {
  albumSub: Subscription;
  album: AlbumModel;
  tracks: any;

  constructor(private route: ActivatedRoute, private location: Location, private albumsLocal: AlbumLocalStorageService) {
  }

  ngOnInit(): void {
    this.albumSub = this.route.data.subscribe(({ album }) => {
      this.album = album;
      this.tracks = album.tracks.items.map(data => {
        if (typeof data.duration_ms === 'number') {
          const minutes = Math.floor(data.duration_ms / 60000);
          const seconds = ((data.duration_ms % 60000) / 1000).toFixed(0);
          data.duration_ms = `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
          return data;
        }else{
          return data;
        }
      });
    });

    this.albumsLocal.add(this.album);
  }

  backClicked(): void {
    this.location.back();
  }

}
