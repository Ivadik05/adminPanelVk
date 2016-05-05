import {request} from './request';
import {queries} from '../queries';
import { events } from '../../events';

type photosData = {
  method: string;
  owner_id: string;
  album_id: string;
}

export class GetPhotos extends request.VK {
  private ownerId: string;
  private albumId: string;

  /**
   * @param ownerId идентификатор пользователя
   */
  constructor(ownerId: string, albumId) {
    super(queries.GET_PHOTOS, events.saver.PHOTOS);
    this.ownerId = ownerId;
    this.albumId = albumId;
  }

  /**
   * @returns {string}
   */
  public getOwnerId(): string {
    return this.ownerId;
  }

  /**
   * @returns {string}
   */
  public getAlbumId(): string {
    return this.albumId;
  }


  /**
   * @inheritDoc
   */
  public getData(): photosData {
    let data = {
      'method': this.getName(),
      'owner_id': this.getOwnerId(),
      'album_id': this.getAlbumId()
    };
    return data;
  }
}
