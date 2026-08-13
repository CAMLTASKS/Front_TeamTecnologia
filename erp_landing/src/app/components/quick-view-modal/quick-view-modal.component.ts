import { Component, inject, signal, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { QuickViewService } from '../../core/services/quick-view.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  styleUrl: './quick-view-modal.component.css',
  selector: 'app-quick-view-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './quick-view-modal.component.html',
})
export class QuickViewModalComponent {
  quickViewService = inject(QuickViewService);
  cartService = inject(CartService);

  @Input() product?: Product | null;
  @Output() close = new EventEmitter<void>();

  qty = signal<number>(1);
  inWishlist = signal<boolean>(false);
  addedToCart = signal<boolean>(false);

  get activeProduct(): Product | null {
    return this.product || this.quickViewService.activeProduct();
  }

  get isOpen(): boolean {
    return !!this.product || this.quickViewService.isOpen();
  }

  increaseQty() {
    this.qty.update(q => q + 1);
  }

  decreaseQty() {
    this.qty.update(q => (q > 1 ? q - 1 : 1));
  }

  closeModal() {
    this.close.emit();
    this.quickViewService.closeQuickView();
    this.qty.set(1);
    this.addedToCart.set(false);
  }

  addToCart(prod: Product) {
    this.cartService.addToCart(prod, this.qty());
    this.addedToCart.set(true);
    setTimeout(() => {
      this.addedToCart.set(false);
      this.closeModal();
    }, 1500);
  }

  toggleWishlist() {
    this.inWishlist.set(!this.inWishlist());
  }
}
