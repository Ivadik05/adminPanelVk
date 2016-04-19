import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { marketType } from '../../../io/types';
import {events} from '../../../events';
import { GetPagesData } from '../../../io/request/get-pages-data';


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

  }

  private initApiListeners() {

  }
}

export default function startAboutService(sender) {
  return new About(sender);
}
