import store from './store';
import actors from './actors';

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

store.dispatch({
  type: 'APPLICATION_STARTED',
  payload: '123'
});
