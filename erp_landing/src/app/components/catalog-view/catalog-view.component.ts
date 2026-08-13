import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { QuickViewModalComponent } from '../quick-view-modal/quick-view-modal.component';

@Component({
  selector: 'app-catalog-view',
  standalone: true,
  imports: [CommonModule, QuickViewModalComponent],
  templateUrl: './catalog-view.component.html',
  styleUrl: './catalog-view.component.css'
})
export class CatalogViewComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  cartService = inject(CartService);

  // Layout Grid Mode Signal: 'grid-4' | 'grid-3' | 'grid-2' | 'list'
  gridMode = signal<'grid-4' | 'grid-3' | 'grid-2' | 'list'>('grid-4');

  // Selected Filter Signals
  inStockOnly = signal<boolean>(false);
  outOfStockOnly = signal<boolean>(false);
  maxPrice = signal<number>(5000);
  selectedBrands = signal<string[]>([]);
  selectedCategoryFilter = signal<string>('');
  sortBy = signal<string>('best-selling');

  // Quick View Modal Signal
  selectedQuickViewProduct = signal<Product | null>(null);

  // Available Brands List
  availableBrands = [
    'Lenovo',
    'Dell',
    'Cisco',
    'Fortinet',
    'Intel',
    'NVIDIA',
    'Synology',
    'Hikvision'
  ];

  // Computed Filtered Products List
  filteredProducts = computed(() => {
    let prods = this.productService.products();

    // Filter by category
    if (this.selectedCategoryFilter()) {
      prods = prods.filter(p => p.category_id === this.selectedCategoryFilter());
    }

    // Filter by max price
    prods = prods.filter(p => p.price <= this.maxPrice());

    // Filter by brand
    if (this.selectedBrands().length > 0) {
      prods = prods.filter(p => {
        return this.selectedBrands().some(brand => p.title.toLowerCase().includes(brand.toLowerCase()) || p.vendor.toLowerCase().includes(brand.toLowerCase()));
      });
    }

    // Sorting
    const sort = this.sortBy();
    if (sort === 'price-low') {
      prods = [...prods].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      prods = [...prods].sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      prods = [...prods].sort((a, b) => String(b.id).localeCompare(String(a.id)));
    } else if (sort === 'title') {
      prods = [...prods].sort((a, b) => a.title.localeCompare(b.title));
    }

    return prods;
  });

  setGridMode(mode: 'grid-4' | 'grid-3' | 'grid-2' | 'list') {
    this.gridMode.set(mode);
  }

  toggleBrand(brand: string) {
    this.selectedBrands.update(list => {
      if (list.includes(brand)) {
        return list.filter(b => b !== brand);
      } else {
        return [...list, brand];
      }
    });
  }

  selectCategory(catId: string) {
    if (this.selectedCategoryFilter() === catId) {
      this.selectedCategoryFilter.set('');
    } else {
      this.selectedCategoryFilter.set(catId);
    }
  }

  openQuickView(product: Product) {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView() {
    this.selectedQuickViewProduct.set(null);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
  }
}
