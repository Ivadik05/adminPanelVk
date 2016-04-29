import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { events } from '../../../events';
import { marketType } from '../../../io/types';
import { WebStorage, storageKeys } from '../../../storage';
import { IStorage } from '../../../io/interfaces/IStorage';
import ShoppingCart from './shopping-cart';

class Market extends Service {
  private sender: WebSender = null;
  private storage: IStorage = null;
  private shoppingCart: ShoppingCart = null;

  constructor(sender, store) {
    super(names.services.MARKET);
    let products = store.getState().market.data || [];
    this.sender = sender;
    this.initListeners();
    this.storage = new WebStorage(names.services.MARKET);
    this.shoppingCart = new ShoppingCart(products);
    this.checkStorage();
  }

  private checkStorage() {
    let shoppingCart = this.storage.restoreData(storageKeys.market.SHOPPING_CART);
    if (shoppingCart) {
      this.shoppingCart.setCart(shoppingCart);
      this.publishEvent(events.market.DRAW_SHOPPING_CART, shoppingCart);
    }
  };

  private initListeners() {
    this.listenEvent(events.market.ADD_PRODUCT, (productDetail: marketType) => {
      this.shoppingCart.add(productDetail);
      this.storage.saveData(storageKeys.market.SHOPPING_CART, this.shoppingCart.getCart());
      this.publishEvent(events.market.DRAW_SHOPPING_CART, this.shoppingCart.getCart());
    });

    this.listenEvent(events.market.REMOVE_PRODUCT, (productDetail: marketType) => {
      this.shoppingCart.remove(productDetail);
      this.storage.saveData(storageKeys.market.SHOPPING_CART, this.shoppingCart.getCart());
      this.publishEvent(events.market.DRAW_SHOPPING_CART, this.shoppingCart.getCart());
    });
  }
}

export default function startMarketService(sender, store) {
  return new Market(sender, store);
}
