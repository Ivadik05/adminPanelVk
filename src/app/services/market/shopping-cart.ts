import Service from '../service';
import { names } from '../names';
import { marketType, shoppingCart, shoppingCartItem } from '../../../io/types';

class ShoppingCart extends Service {
  private products: Array<marketType> = [];
  private productsSelected: Array<shoppingCartItem> = [];
  constructor(products: Array<marketType>) {
    super(names.services.MARKET_SHOPPING_CART);
    this.products = products;
  }

  private createProductCart(productDetail: marketType) {
    this.productsSelected.push({
      id: productDetail.id,
      quantity: 1,
      product: productDetail
    });
  }

  private getProductCart(productDetailId): any {
    return this.productsSelected.filter((item: shoppingCartItem) => item.id === productDetailId)[0];
  }

  private getSum(): number {
    return this.productsSelected.reduce((sum, item: shoppingCartItem) => {
      return sum + (item.product['priceNum'] * item.quantity);
    }, 0);
  }

  private getCount(): number {
    return this.productsSelected.reduce((sum, item: shoppingCartItem) => {
      return sum + item.quantity;
    }, 0);
  }

  setCart(cart: shoppingCart) {
    this.productsSelected = cart.productsSelected;
  }

  getCart(): shoppingCart {
    return {
      sum: this.getSum(),
      count: this.getCount(),
      productsSelected: this.productsSelected
    };
  }

  public add(productDetail: marketType) {
    let productCart = this.getProductCart(productDetail.id);
    if (productCart) {
      productCart.quantity =  ++productCart.quantity;
    } else {
      this.createProductCart(productDetail);
    }
  }

  public removeItem(productDetail: marketType) {
    let productCart = this.getProductCart(productDetail.id);
    if (productCart) {
      if (productCart.quantity > 1) {
        productCart.quantity =  --productCart.quantity;
      }
    }
  }

  public remove(productDetail: marketType) {
    this.productsSelected = this.productsSelected.filter((item: shoppingCartItem) => {
      return (item.id !== productDetail.id);
    });
  }
}

export default ShoppingCart;
