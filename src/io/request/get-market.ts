import {request} from './request';
import {queries} from '../queries';
import { events } from '../../events';
import {error} from "util";

type marketData = {
  method: string;
  owner_id: string;
  album_id?: string;
  extended?: number;
}

export class GetMarket extends request.VK {
  private ownerId: string;
  private albumId: string;
  private extended: number;

  /**
   * @param ownerId идентификатор группы
   */
  constructor(ownerId: string, albumId?: string, extended?: boolean) {
    super(queries.GET_MARKET, events.saver.MARKET);
    this.ownerId = ownerId;
    this.albumId = albumId;
    this.extended = extended ? 1 : 0;
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
   * @returns {string}
   */
  public getExtended(): number {
    return this.extended;
  }

  /**
   * @returns {string}
   */
  public isExtended(): boolean {
    return Boolean(this.extended === 1);
  }

  /**
   * @inheritDoc
   */
  public getData(): marketData {
    let data = {
      'method': this.getName(),
      'owner_id': this.getOwnerId()
    };
    if (this.getAlbumId()) {
      data['album_id'] = this.getAlbumId();
    }
    if (this.isExtended()) {
      data['extended'] = this.getExtended();
    }
    return data;
  }
}
