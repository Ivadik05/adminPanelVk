import {request} from './request';
import {queries} from '../queries';
import {error} from "util";

type marketData = {
  method: string;
  group_id: string;
  topic_id: string;
}

// http://ecoprint43.ru/connector.php?method=board.getComments&group_id=61279456&topic_id=33502073
export class GetAbout extends request.VK {
  private groupId: string;
  private topicId: string;

  /**
   * @param groupId идентификатор группы
   * @param topicId идентификатор топика
   */
  constructor(groupId: string, topicId: string) {
    super(queries.GET_COMMENTS);
    this.groupId = groupId;
    this.topicId = topicId;
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
  public getTopicId(): string {
    return this.topicId;
  }

  /**
   * @inheritDoc
   */
  public getData(): marketData {
    let data = {
      'method': this.getName(),
      'group_id': this.getGroupId(),
      'topic_id': this.getTopicId()
    };
    return data;
  }
}
