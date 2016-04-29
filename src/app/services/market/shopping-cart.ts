import Service from '../service';
import { names } from '../names';
import { marketType } from '../../../io/types/index';

type shoppingCartItem = {
  id: string,
  quantity: number;
  product: marketType;
}

type shoppingCart = {
  sum: number,
  productsSelected: Array<shoppingCartItem>;
}

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
    })
  }

  private getProductCart(productDetailId): any {
    return this.productsSelected.filter((item: shoppingCartItem) => item.id === productDetailId)[0];
  }

  private getSum(): number {
    return this.productsSelected.reduce((sum, item: shoppingCartItem) => {
      return sum + (item.product['priceNum'] * item.quantity);
    }, 0);
  }

  setCart(cart: shoppingCart) {
    this.productsSelected = cart.productsSelected;
  }

  getCart(): shoppingCart {
    return {
      sum: this.getSum(),
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
  };

  public remove(productDetail: marketType) {
    let productCart = this.getProductCart(productDetail.id);
    if (productCart) {
      productCart.quantity =  --productCart.quantity;
      if (productCart.quantity < 1) {
        this.productsSelected = this.productsSelected.filter((item: shoppingCartItem) => {
          return (item.id !== productDetail.id);
        });
      }
    }
  };
}

export default ShoppingCart;
