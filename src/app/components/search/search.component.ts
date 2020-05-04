import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {AlbumModel} from '../../models/album.model';
import {HttpClient} from '@angular/common/http';
import {SearchModelModel} from '../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  @Output() respostaFamilia: any = new EventEmitter();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.myControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(data => {
        if (data !== '') {
          this.http.get('https://api.spotify.com/v1/search?type=album,track,artist&q=' + data)
            .subscribe(
              (res: SearchModelModel) => {
                this.respostaFamilia.emit(res.albums.items);
              },
              error => {
                alert('Houve um erro ao carregar os álbuns!');
              });
        }
      }
      );
  }

}
