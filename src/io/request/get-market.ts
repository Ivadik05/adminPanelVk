import {request} from './request';
import {queries} from '../queries';

export class GetMarket extends request.VK {
  private ownerId: string;

  /**
   * @param ownerId идентификатор группы
   */
  constructor(ownerId: string) {
    super(queries.GET_MARKET);
    this.ownerId = ownerId;
  }

  /**
   * @returns {string}
   */
  public getOwnerId(): string {
    return this.ownerId;
  }

  /**
   * @inheritDoc
   */
  public getData() {
    return {
      'query': this.getName(),
      'owner_id': this.getOwnerId()
    };
  }
}
