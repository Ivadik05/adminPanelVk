import store from '../../store';
import { utils } from '../../utils';
import {events} from '../../events';

export default class Service {
  public utils: Object = utils;
  private name: string;
  constructor(name) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public listenEvent(type: string, callback: Function) {
    store.subscribe(() => {
      let event = store.getState().event;
      if (event.type === type) {
        callback(event.payload);
      }
    });
  }

  public publishEvent(type: string, payload?: any) {
    if (type) {
      store.dispatch({type, payload});
    } else {
      console.error(`APP - publish unknown type: ${type} from: ${this.getName()}`);
    }
  }
}
