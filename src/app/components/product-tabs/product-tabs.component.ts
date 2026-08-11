import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { QuickViewService } from '../../core/services/quick-view.service';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.css',})
export class ProductTabsComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  quickViewService = inject(QuickViewService);

  tabs = ['Decker Tool', 'Hammer Tool', 'Drill Tool'];
  activeTab = signal<string>('Decker Tool');
}
