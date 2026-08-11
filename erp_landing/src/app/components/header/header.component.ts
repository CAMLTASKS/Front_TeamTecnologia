import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { MobileNavService } from '../../core/services/mobile-nav.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  styleUrl: './header.component.css',
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  cartService = inject(CartService);
  mobileNavService = inject(MobileNavService);
  categoryService = inject(CategoryService);
  
  showCategory = signal<boolean>(false);
  showSearchModal = signal<boolean>(false);
  searchQuery = signal<string>('');

  quickTags = ['Angle Grinder', 'Drill Machine', 'Cordless Driver', 'Power Saw', 'Tile Blade'];

  toggleCategory() {
    this.showCategory.update(v => !v);
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
}
