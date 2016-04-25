import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { GetMarket, GetPage, Execute } from '../../../io/request';
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
    let requestList: Array<IRequest> = [
      new GetMarket(connector.GROUP_ID, '', true),
      new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT),
    ];
    let code = Execute.createPromiseCode(requestList);
    // {"name":"market.get","saver":"market","data":API.market.get({"owner_id":-61279456,"extended":1})}
    let customCode = `var categories = API.market.getAlbums({"owner_id":-61279456});
                      var products = [];
                      var preparateCategories = [];
                      var i = -1;
                      products = API.market.get({"owner_id":-61279456}).items;
                      var productByAlbum;
                      
                      while (i < categories.items.length) {
                        i = i + 1;
                        if (categories.items[i].id > 0) {
                          preparateCategories.push(categories.items[i]);
                          productByAlbum = {"albumId": categories.items[i].id, "products": API.market.get({"owner_id":-61279456, "album_id": categories.items[i].id}).items};
                        }
                      };
                      return[
                        {
                          "name": "market.album",
                          "saver": market
                          "data": {
                            "categories": preparateCategories,
                            "products": products,
                            "productByAlbum": productByAlbum
                          }
                        },
                        ${code}
                      ];`;

    console.error(customCode);
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
