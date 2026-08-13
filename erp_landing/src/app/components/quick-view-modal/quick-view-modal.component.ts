import { Component, inject, signal, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickViewService } from '../../core/services/quick-view.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  styleUrl: './quick-view-modal.component.css',
  selector: 'app-quick-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-view-modal.component.html',
})
export class QuickViewModalComponent {
  quickViewService = inject(QuickViewService);
  cartService = inject(CartService);

  @Input() product?: Product | null;
  @Output() close = new EventEmitter<void>();

  quantity = signal<number>(1);

  get activeProduct(): Product | null {
    return this.product || this.quickViewService.activeProduct();
  }

  get isOpen(): boolean {
    return !!this.product || this.quickViewService.isOpen();
  }

  increaseQty() {
    this.quantity.update(q => q + 1);
  }

  decreaseQty() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  closeModal() {
    this.close.emit();
    this.quickViewService.closeQuickView();
    this.quantity.set(1);
  }

  addToCart(prod: Product) {
    this.cartService.addToCart(prod, this.quantity());
    this.closeModal();
  }
}
