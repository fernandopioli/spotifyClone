import {AlbumModel} from './album.model';

export class SearchModelModel {
  albums: PaginationModel<AlbumModel>;
}

export class PaginationModel<T> {
  items: T[];
  limit: number;
  total: number;
  offset: number;
  next: string;
  previous: string;
}
