import {request} from './request';
import {queries} from '../queries';
import { events } from '../../events';
import {error} from "util";

type pagesData = {
  method: string;
  group_id: string;
  preview: string;
  preview_length: string;
}

// http://ecoprint43.ru/connector.php?method=board.getComments&group_id=61279456&topic_id=33502073
// http://ecoprint43.ru/connector.php?group_id=61279456&method=board.getTopics&preview=1&preview_length=0
export class GetPagesData extends request.VK {
  private groupId: string;
  private preview: string = '1';
  private previewLength: string = '0';

  /**
   * @param groupId идентификатор группы
   */
  constructor(groupId: string) {
    super(queries.GET_PAGES, events.saver.PAGES);
    this.groupId = groupId;
  }

  /**
   * @returns {string}
   */
  public getGroupId(): string {
    return this.groupId;
  }

  /**
   * @returns {string}
   */
  public getPreview(): string {
    return this.preview;
  }

  /**
   * @returns {string}
   */
  public getPreviewLength(): string {
    return this.previewLength;
  }

  /**
   * @inheritDoc
   */
  public getData(): pagesData {
    let data = {
      'method': this.getName(),
      'group_id': this.getGroupId(),
      'preview': this.getPreview(),
      'preview_length': this.getPreviewLength()
    };
    return data;
  }
}
