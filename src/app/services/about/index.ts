import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { marketType } from '../../../io/types';
import {events} from '../../../events';
import { GetPage } from '../../../io/request';
import { BaseResponse } from '../../../io/response/response';
import { connector } from '../../../constants';


class About extends Service {
  private sender: WebSender = null;
  constructor(sender) {
    super(names.services.ABOUT);
    this.sender = sender;
    this.initListeners();
    this.initApiListeners();
    // this.sender.send(new GetAbout('61279456', '33502073'), (response: Array<marketType>) => {
    //   this.publishEvent(events.about.DRAW_ABOUT_CONTENT, response);
    // });
  }

  private initListeners() {
    this.listenEvent(events.about.GET_ABOUT, () => {
      this.sender.send(new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT), (response: BaseResponse) => {
        // console.error(response.getSaverEvent());
        // console.error(response.getName());
        // console.error(response.getData());
        this.publishEvent(events.about.DRAW_ABOUT_CONTENT, response.getData());
      });
    });
  }

  private initApiListeners() {

  }
}

export default function startAboutService(sender) {
  return new About(sender);
}
