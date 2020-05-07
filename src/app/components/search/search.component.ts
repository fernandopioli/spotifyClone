import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, share} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {SearchModelModel} from '../../models/search.model';
import {AlbumsStore} from '../../services/albumsStore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  keyword = '';
  offset = 0;
  limit = 20;
  totalItems = 0;
  scrollLock = false;
  showInfiniteScroll = true;

  constructor(private http: HttpClient, private albumStore: AlbumsStore) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (((window.innerHeight + window.scrollY + 1) >=
      document.body.offsetHeight) || ((window.innerHeight + document.documentElement.scrollTop)
      >= document.body.offsetHeight)) {
      if (!this.scrollLock){
        this.scrollLock = true;

        if (this.offset <= this.totalItems){
          console.log('rola');
          this.loadAlbums();
        }else{
          console.log('nao tem');
        }

      }
    }
  }

  loadAlbums(){
    this.http.get(`https://api.spotify.com/v1/search?type=album,track,artist&limit=${this.limit}&offset=${this.offset}&q=${this.keyword}`)
      .pipe(share())
      .subscribe(
        (res: SearchModelModel) => {
          console.log(res.albums);
          this.scrollLock = false;
          this.totalItems = res.albums.total;
          this.offset = this.offset + this.limit;
          this.albumStore.add(res.albums.items);
        },
        error => {
          alert('Houve um erro ao carregar os álbuns!');
        });
  }

  ngOnInit(): void {
    this.myControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(data => {
        this.keyword = data;
        if (data !== '') {
          this.loadAlbums();
        }else{
          this.albumStore.clear();
        }
      }
      );
  }

}
