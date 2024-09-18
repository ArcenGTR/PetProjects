import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  public products: Product[] = [];
  public currentCategoryId: number = 1;
  public searchMode: boolean = false;

  public pageNumber: number = 1;
  public pageSize: number = 12;
  public totalElements: number = 0;
  public previousCategoryId: number = 1;

  public previousKeyword: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listProducts());
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearch();
    } else {
      this.handleListProducts();
    }
  }

  handleSearch() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(keyword, this.pageNumber - 1, this.pageSize)
                        .subscribe(data => {
                          this.products = data._embedded.products;
                          this.pageNumber = data.page.number + 1;
                          this.pageSize = data.page.size;
                          this.totalElements = data.page.totalElements;
                        })
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // + at the begining is used to convert number into string
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }


    if (this.currentCategoryId != this.previousCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.currentCategoryId, this.pageNumber - 1, this.pageSize)
      .subscribe(data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      })
  }

  updatePageSize(newPageSize: string) {
    this.pageSize = Number(newPageSize);
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(p: Product) {
    const cartItem: CartItem = new CartItem(p);

    this.cartService.addToCart(cartItem);
  }
}
