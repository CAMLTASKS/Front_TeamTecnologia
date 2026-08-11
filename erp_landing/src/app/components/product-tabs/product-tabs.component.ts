import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { CartService } from '../../core/services/cart.service';
import { QuickViewService } from '../../core/services/quick-view.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.css',
})
export class ProductTabsComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  cartService = inject(CartService);
  quickViewService = inject(QuickViewService);

  selectCategory(categoryId: string) {
    this.productService.loadProducts(categoryId);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  openQuickView(product: Product) {
    this.quickViewService.openQuickView(product);
  }
}
