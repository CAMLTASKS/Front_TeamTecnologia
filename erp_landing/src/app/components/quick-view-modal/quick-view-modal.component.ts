import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickViewService } from '../../core/services/quick-view.service';
import { CartService } from '../../core/services/cart.service';

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

  quantity = signal<number>(1);

  increaseQty() {
    this.quantity.update(q => q + 1);
  }

  decreaseQty() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, this.quantity());
    this.quickViewService.closeQuickView();
    this.quantity.set(1);
  }
}
