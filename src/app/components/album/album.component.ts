import {Component, Input, OnInit} from '@angular/core';
import {AlbumModel} from '../../models/album.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() album: AlbumModel;
  @Input() css: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAlbum(): void {
    this.router.navigate(['album/' + this.album.id]);
  }

}
