import Service from './service';
import {names} from './names';
import {events} from '../../events';

// import { LocalStorage } from 'web-storage';
// import Person from '../../model-storage/models/person/person';
// import { ModelStorage } from '../../model-storage';
// import { storageMarks } from '../../app/storage-marks';

// import { generateId } from '../../util';

class Application extends Service {
  // private transponder: Transponder = null;
  constructor(sender, store) {
    super(names.services.APPLICATION);
    this.publishEvent(events.system.APPLICATION_STARTED);
  }
}

export default function startApplicationService(sender, store) {
  return new Application(sender, store);
}
