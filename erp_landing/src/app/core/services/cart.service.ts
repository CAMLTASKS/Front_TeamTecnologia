import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  isCartOpen = signal<boolean>(false);

  totalCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  addToCart(product: Product, quantity = 1) {
    const items = [...this.cartItems()];
    const index = items.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      items[index].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.cartItems.set(items);
    this.openCart();
  }

  removeFromCart(productId: number) {
    this.cartItems.set(this.cartItems().filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const items = this.cartItems().map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.set(items);
  }

  openCart() {
    this.isCartOpen.set(true);
  }

  closeCart() {
    this.isCartOpen.set(false);
  }

  toggleCart() {
    this.isCartOpen.update(v => !v);
  }
}
