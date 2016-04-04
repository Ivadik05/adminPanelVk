import store from './ui/store';
import actors from './ui/actors';

let acting: boolean = false;

store.subscribe(function() {
  if (!acting) {
    acting = true;
    for (let actor of actors) {
      actor(store.getState(), store.dispatch);
    }

    acting = false;
  }
});
