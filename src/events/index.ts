

export module events {
  'use strict';
  export const system = {
    'APPLICATION_STARTED': 'application-started'
  };

  export const market = {
    'DRAW_MARKETS': 'draw-markets',
    'GET_MARKET': 'get-market',
    'ADD_PRODUCT': 'add-product',
    'REMOVE_PRODUCT': 'remove-product',
    'REMOVE_PRODUCT_ITEM': 'remove-product-item',
    'DRAW_SHOPPING_CART': 'draw-shopping-cart',
    'CLEAR_SHOPPING_CART': 'clear-shopping-cart',
    'ACCEPT_ORDER': 'accept-order',
    'SUCCESS_ORDER': 'success-order'
  };

  export const about = {
    'DRAW_ABOUT_CONTENT': 'draw-about-content',
    'GET_ABOUT': 'get-about'
  };

  export const saver = {
    'EXECUTE': 'execute',
    'MARKET': 'market',
    'MARKET_ALBUMS': 'market-albums',
    'PAGES': 'pages',
    'PHOTOS': 'photos'
  };

  export const router = {
    'LOCATION_CHANGE': '@@router/LOCATION_CHANGE'
  };
}
