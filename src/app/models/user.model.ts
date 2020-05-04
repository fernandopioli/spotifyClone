import {ImagesModel} from './album.model';

export class UserModel {
  id: number;
  // tslint:disable-next-line:variable-name
  display_name: string;
  email: string;
  images: ImagesModel[];
}
