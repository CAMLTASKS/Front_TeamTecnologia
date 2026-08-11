import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class QuickViewService {
  activeProduct = signal<Product | null>(null);
  isOpen = signal<boolean>(false);

  openQuickView(product: Product) {
    this.activeProduct.set(product);
    this.isOpen.set(true);
  }

  closeQuickView() {
    this.isOpen.set(false);
    this.activeProduct.set(null);
  }
}
