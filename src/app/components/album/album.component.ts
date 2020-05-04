import {Component, Input, OnInit} from '@angular/core';
import {AlbumModel} from '../../models/album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() album: AlbumModel;
  constructor() { }

  ngOnInit(): void {
  }

}
