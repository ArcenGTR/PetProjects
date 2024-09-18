import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  public product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {}


  handleProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe( data => this.product = data );
  }
              
  ngOnInit(): void {
    this.route.paramMap.subscribe( () => this.handleProductDetails() )
  }

  addToCart(product: Product) {
    const cartItem: CartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

}
