import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { GetMarket, GetPage, Execute } from '../../../io/request';
import { queries } from '../../../io/queries';
import { events } from '../../../events';
import { BaseResponse } from '../../../io/response/response';
import { connector } from '../../../constants';
import { IRequest } from '../../../io/interfaces';

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
      let customCode = `var categories = API.market.getAlbums({"owner_id":-61279456});
        var products = [];
        var preparateCategories = [];
        var i = -1;
        products = API.market.get({"owner_id":-61279456}).items;
        var productByAlbum = [];
        while (i < categories.items.length) {
          i = i + 1;
          if (categories.items[i].id > 0) {
            preparateCategories.push(categories.items[i]);
            productByAlbum.push({
              "albumId": categories.items[i].id,
              "products": API.market.get({"owner_id":-61279456, "album_id": categories.items[i].id}).items@.id
            });
          }
        }
        return[
          {
            "name": "${queries.GET_ALBUMS_MARKET}",
            "saver": "${events.saver.MARKET_ALBUMS}",
            "data": {
              "albums": preparateCategories,
              "products": products,
              "productByAlbum": productByAlbum
            }
          }
        ];`;
      // `return[${code}];`
      this.sender.send(new Execute(customCode), (responses: Array<BaseResponse<any>>) => {
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
