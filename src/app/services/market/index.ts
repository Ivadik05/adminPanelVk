import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { GetMarket, GetPage } from '../../../io/request';
import { marketType } from '../../../io/types';
import {events} from '../../../events';
import { BaseResponse } from '../../../io/response/response';
import { connector } from '../../../constants';

class Market extends Service {
  private sender: WebSender = null;
  constructor(sender) {
    super(names.services.MARKET);
    this.sender = sender;
    this.initListeners();
    this.initApiListeners();
    // this.sender.send(new GetMarket('-61279456', '', true), (response: Array<marketType>) => {
    //   this.publishEvent(events.market.DRAW_MARKETS, response);
    // });

  }

  private initListeners() {
    this.listenEvent(events.market.GET_MARKET, () => {
      this.sender.send(new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT), (response: BaseResponse) => {
        // console.error(response.getSaverEvent());
        // console.error(response.getName());
        // console.error(response.getData());
        // this.publishEvent(events.market.DRAW_MARKETS, response.getData());
      });
      // this.sender.send(new GetMarket('-61279456', '', true), (response: BaseResponse) => {
      //   this.publishEvent(events.market.DRAW_MARKETS, response.getData());
      // });
    });
  }

  private initApiListeners() {

  }
}

export default function startMarketService(sender) {
  return new Market(sender);
}
