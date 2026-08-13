import { Injectable, signal } from '@angular/core';

export interface WishlistProduct {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand?: string;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private _items = signal<WishlistProduct[]>([]);

  items = this._items.asReadonly();
  totalCount = () => this._items().length;

  addToWishlist(product: WishlistProduct) {
    if (!this._items().find(i => i.id === product.id)) {
      this._items.update(list => [...list, product]);
    }
  }

  removeFromWishlist(productId: string | number) {
    this._items.update(list => list.filter(i => i.id !== productId));
  }

  isInWishlist(productId: string | number): boolean {
    return this._items().some(i => i.id === productId);
  }

  toggleWishlist(product: WishlistProduct) {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }
}
