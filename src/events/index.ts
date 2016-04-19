

export module events {
  'use strict';
  export const system = {
    'APPLICATION_STARTED': 'application-started'
  };

  export const market = {
    'DRAW_MARKETS': 'draw-markets',
    'GET_MARKET': 'get-market'
  };

  export const about = {
    'DRAW_ABOUT_CONTENT': 'draw-about-content'
  };

  export const saver = {
    'MARKET': 'market',
    'PAGES': 'pages'
  };
}
