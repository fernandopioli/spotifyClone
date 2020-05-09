import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, share} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {SearchModelModel} from '../../models/search.model';
import {AlbumsStore} from '../../services/albumsStore.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  offset = 0;
  limit = 20;
  totalItems = 0;
  scrollLock = false;
  hasNextPage = true;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private albumStore: AlbumsStore) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (((window.innerHeight + window.scrollY + 1) >=
      document.body.offsetHeight) || ((window.innerHeight + document.documentElement.scrollTop)
      >= document.body.offsetHeight)) {
      if (!this.scrollLock){
        this.scrollLock = true;
        if (this.hasNextPage && this.myControl.value){
          this.loadAlbums();
        }
      }
    }
  }

  loadAlbums(): void{
    this.http.get(`${this.baseUrl}search?type=album,track,artist&limit=${this.limit}&offset=${this.offset}&q=${this.myControl.value}`)
      .pipe(share())
      .subscribe(
        (res: SearchModelModel) => {
          this.scrollLock = false;
          this.totalItems = res.albums.total;
          this.offset = this.offset + this.limit;
          if (!res.albums.next){
            this.hasNextPage = false;
          }
          this.albumStore.add(res.albums.items);
        },
        error => {
          alert('Houve um erro ao carregar os álbuns!');
        });
  }

  ngOnInit(): void {
    if (this.albumStore.getSearchedKeyword){
      this.myControl.setValue(this.albumStore.getSearchedKeyword);
    }
    this.myControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(data => {
        this.albumStore.clear();
        this.offset = 0;
        this.totalItems = 0;
        this.scrollLock = false;
        this.hasNextPage = true;
        this.albumStore.setSearchedKeyword = data;
        if (data !== '') {
          this.loadAlbums();
        }else{
          this.albumStore.clear();
        }
      }
      );
  }

}
