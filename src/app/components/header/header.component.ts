import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { MobileNavService } from '../../core/services/mobile-nav.service';

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
  showCategory = signal<boolean>(false);

  toggleCategory() {
    this.showCategory.update(v => !v);
  }
}
