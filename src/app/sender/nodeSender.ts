import { Io  } from '../../io';
import { ITransmitter, IRequest, IAbstractRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { NodeTransmitter } from '../../io/transmitter';
import { ISender } from './index';
import { Store } from 'redux';

import { GetMarket, GetPage, Execute } from '../../io/request';
import { BaseResponse } from '../../io/response/response';
import { connector } from '../../constants';
import { executeType } from '../../io/types';

export class NodeSender implements ISender {
  private io: Io = null;
  private store: Store;
  private requestList: Array<IRequest> = [
    new GetMarket(connector.GROUP_ID, '', true),
    new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT),
    new GetPage(connector.GROUP_ID, connector.PAGE_CONTACTS),
    new GetPage(connector.GROUP_ID, connector.PAGE_DELIVERY),
    new GetPage(connector.GROUP_ID, connector.PAGE_MARKET)
  ];

  constructor(store: any) {
    let requestSettings = {
      host: settings.HOST,
      path: settings.PATH
    };
    this.store = store;
    let transmitter: ITransmitter = new NodeTransmitter(requestSettings);
    this.io = new Io(requestSettings, transmitter);
  }

  // private updateStore(response: BaseResponse) {
  //   this.store.dispatch({
  //     type: response.getSaverEvent(),
  //     payload: response.getData()
  //   });
  // }

  public send() {}

  public fetchAllData(callback) {
    // TODO Promise.all с одним ответом
    // let requestName = request.getRequest().getName();
    let code = Execute.createPromiseCode(this.requestList);
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
    this.io.send(new Execute(`return[${code}];`), (response: BaseResponse<executeType>) => {
      response.getData().map((res: BaseResponse<any>) => {
        this.store.dispatch({
          type: res.getSaverEvent(),
          payload: res.getData()
        });
      });
      callback();
    });
  }
}
