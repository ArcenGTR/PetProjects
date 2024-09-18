import { Subject } from 'rxjs';
import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: CartItem[] = [];

  public totalPrice: Subject<number> = new Subject();
  public totalQuantity: Subject<number> = new Subject();

  constructor() { }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let c of this.cartItems) {
      totalPriceValue += c.unitPrice * c.quantity;
      totalQuantityValue += c.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    console.log(`\n\n\nContent of the Cart is:`);
      for (let p of this.cartItems) {
        console.log(p.name, p.unitPrice, p.quantity);
      }
      console.log(`Total Price is: ${totalPriceValue}, Total Quantity is: ${totalQuantityValue}`)
  }

  addToCart(cartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    /*
    if (this.cartItems.length > 0) {
      for (let c of this.cartItems) {
        if (c.id === cartItem.id) {
            existingCartItem = c;
            break;
        }
      }
    } 
    */

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find( tempCartItem => cartItem.id === tempCartItem.id )!;
    }

    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }


    this.computeCartTotals();

  }

  decremetQuantity(p: CartItem) {
    p.quantity--;

    if (p.quantity === 0) {
      this.remove(p);
    } else {
      this.computeCartTotals();
    }
  }

  remove(p: CartItem) {
    const itemIndex = this.cartItems.findIndex( tempProduct => tempProduct.id === p.id );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.computeCartTotals();
  }
}


