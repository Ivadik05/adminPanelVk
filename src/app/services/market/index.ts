import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { GetMarket, GetPage, Execute } from '../../../io/request';
import { events } from '../../../events';
import { BaseResponse } from '../../../io/response/response';
import { connector } from '../../../constants';
import { IRequest } from '../../../io/interfaces';
import { marketType } from '../../../io/types/index';

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
    let requestList: Array<IRequest> = [
      new GetMarket(connector.GROUP_ID, '', true)
    ];
    this.listenEvent(events.market.GET_MARKET, () => {
      let code = Execute.createPromiseCode(requestList);
      this.sender.send(new Execute(code), (responses: Array<BaseResponse<any>>) => {
        console.error(responses);
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
