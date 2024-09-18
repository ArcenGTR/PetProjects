import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {

  constructor(private cartService: CartService) {}

  public cartItems: CartItem[] = [];
  public totalPrice: number = 0;
  public totalQuantity: number = 0;

  ngOnInit() {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe( data => this.totalPrice = data );

    this.cartService.totalQuantity.subscribe( data => this.totalQuantity = data );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(p: CartItem) {
    this.cartService.addToCart(p);
  }

  decrementQuantity(p: CartItem) {
    this.cartService.decremetQuantity(p);
  }

  remove(p: CartItem) {
    this.cartService.remove(p);
  }

}
