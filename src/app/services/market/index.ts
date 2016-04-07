import Service from '../service';
import Sender from '../../sender';
import {names} from '../names';
import { GetMarket } from '../../../io/request/get-market';
import { marketType } from '../../../io/types';
import {events} from '../../../events';

// import { LocalStorage } from 'web-storage';
// import Person from '../../model-storage/models/person/person';
// import { ModelStorage } from '../../model-storage';
// import { storageMarks } from '../../app/storage-marks';

// import { generateId } from '../../util';

class Market extends Service {
  private sender: Sender = null;
  constructor(sender) {
    super(names.services.MARKET);
    this.sender = sender;
    this.initListeners();
    this.initApiListeners();
    this.sender.send(new GetMarket('-61279456', '', true), (response: Array<marketType>) => {
      this.publishEvent(events.market.DRAW_MARKETS, response);
    });
  }

  private initListeners() {

  }

  private initApiListeners() {

  }
}

export default function startMarketService(sender) {
  return new Market(sender);
}
