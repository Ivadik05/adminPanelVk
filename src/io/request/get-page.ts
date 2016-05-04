import {request} from './request';
import {queries} from '../queries';
import { events } from '../../events';
import {error} from "util";

type pagesData = {
  method: string;
  owner_id: string;
  page_id: string;
  need_source: number,
  v: string
}

// http://ecoprint43.ru/connector.php?method=board.getComments&group_id=61279456&topic_id=33502073
// http://ecoprint43.ru/connector.php?group_id=61279456&method=board.getTopics&preview=1&preview_length=0
// http://ecoprint43.ru/connector.php?method=pages.get&owner_id=-61279456&page_id=52376141&need_source=1&v=5.50
export class GetPage extends request.VK {
  private ownerId: string;
  private pageId: string;

  private previewLength: string = '0';

  /**
   * @param ownerId идентификатор группы
   */
  constructor(ownerId: string, pageId) {
    super(queries.GET_PAGE, events.saver.PAGES);
    this.ownerId = ownerId;
    this.pageId = pageId;
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
  public getPageId(): string {
    return this.pageId;
  }


  /**
   * @inheritDoc
   */
  public getData(): pagesData {
    let data = {
      'method': this.getName(),
      'owner_id': '-' + this.getOwnerId(),
      'page_id': this.getPageId(),
      'need_html': 1
    };
    return data;
  }
}
