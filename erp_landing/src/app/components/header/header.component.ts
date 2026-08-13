import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { MobileNavService } from '../../core/services/mobile-nav.service';
import { CategoryService } from '../../core/services/category.service';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  styleUrl: './header.component.css',
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  cartService = inject(CartService);
  mobileNavService = inject(MobileNavService);
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  
  showCategory = signal<boolean>(false);
  showSearchModal = signal<boolean>(false);
  showUserDropdown = signal<boolean>(false);
  searchQuery = signal<string>('');

  quickTags = [
    'Teclados Mecánicos',
    'Mouses Ergonómicos',
    'Hubs USB-C 4K',
    'Laptops Lenovo ThinkPad',
    'Samsung Galaxy S24',
    'Cables HDMI 8K'
  ];

  toggleCategory() {
    this.showCategory.update(v => !v);
    this.showUserDropdown.set(false);
  }

  openSearchModal() {
    this.showSearchModal.set(true);
  }

  closeSearchModal() {
    this.showSearchModal.set(false);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  selectTag(tag: string) {
    this.searchQuery.set(tag);
  }

  toggleUserDropdown() {
    this.showUserDropdown.update(v => !v);
    this.showCategory.set(false);
  }

  logout() {
    this.authService.logout();
    this.showUserDropdown.set(false);
  }
}
