import { Io } from '../../io';
import { ITransport, IRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { NodeTransport } from '../../io/transport';
import { ISender } from './index';
import { Store } from 'redux';

import { GetMarket, GetPage, Execute, GetPhotos } from '../../io/request';
import { BaseResponse } from '../../io/response/response';
import { connector } from '../../constants';
import { executeType } from '../../io/types';
import { queries } from '../../io/queries';
import { events } from '../../events';

export class NodeSender implements ISender {
  private io: Io = null;
  private store: Store<{}>;
  private requestList: Array<IRequest> = [
    new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT),
    new GetPage(connector.GROUP_ID, connector.PAGE_CONTACTS),
    new GetPage(connector.GROUP_ID, connector.PAGE_DELIVERY),
    new GetPage(connector.GROUP_ID, connector.PAGE_MARKET),
    new GetPhotos(connector.OWNER_PHOTO_ID, connector.PHOTO_ALBUM_ID)
  ];

  constructor(store: any) {
    let connectorSettings = settings.connector;
    let requestSettings = {
      host: connectorSettings.HOST,
      path: connectorSettings.PATH,
      port: connectorSettings.PORT
    };
    this.store = store;
    let transport: ITransport = new NodeTransport(requestSettings);
    this.io = new Io(transport);
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
    let customCode = `
        var categories = API.market.getAlbums({"owner_id":-61279456});
        var products = [];
        var preparateCategories = [];
        var i = -1;
        products = API.market.get({"owner_id":-61279456, "extended": 1}).items;
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
          },
          ${code}
        ];`;
    this.io.send(new Execute(customCode), (response: BaseResponse<executeType>) => {
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
