import Service from '../service';
import {names} from '../names';
import {events} from '../../../events';

// import { LocalStorage } from 'web-storage';
// import Person from '../../model-storage/models/person/person';
// import { ModelStorage } from '../../model-storage';
// import { storageMarks } from '../../app/storage-marks';

// import { generateId } from '../../util';

class Market extends Service {
  // private transponder: Transponder = null;
  constructor(sender) {
    super(names.services.MARKET);
    
    this.initListeners();
    this.initApiListeners();
  }

  private initListeners() {

  }

  private initApiListeners() {

  }
}

export default function startMarketService(sender) {
  return new Market(sender);
}
