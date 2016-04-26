

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
    'DRAW_ABOUT_CONTENT': 'draw-about-content',
    'GET_ABOUT': 'get-about'
  };

  export const saver = {
    'EXECUTE': 'execute',
    'MARKET': 'market',
    'MARKET_ALBUMS': 'market-albums',
    'PAGES': 'pages'
  };

  export const router = {
    'LOCATION_CHANGE': '@@router/LOCATION_CHANGE'
  };
}
