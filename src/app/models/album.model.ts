export class AlbumModel {
  images: ImagesModel[];
  name: string;
  artists: ArtistModel[];
}

export class ArtistModel {
  images?: ImagesModel[];
  name: string;
}

export class ImagesModel {
  height?: string;
  width?: string;
  url: string;
}
