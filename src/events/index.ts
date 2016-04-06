

export module events {
  'use strict';
  export const system = {
    'APPLICATION_STARTED': 'application-started'
  };

  export const errors = {
    'AUTH_FAILED': 'auth-failed'
  };

  export function eventList(): Array<string> {
    let arr = [];
    [
      system,
      errors
    ].forEach(function(list) {
     Object.keys(list).forEach(function(i) {
       arr.push(list[i]);
     });
    });
    return arr;
  }
}
