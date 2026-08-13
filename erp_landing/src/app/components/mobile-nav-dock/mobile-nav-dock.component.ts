import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { MobileNavService } from '../../core/services/mobile-nav.service';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-mobile-nav-dock',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-nav-dock.component.html',
  styleUrl: './mobile-nav-dock.component.css'
})
export class MobileNavDockComponent {
  cartService = inject(CartService);
  mobileNavService = inject(MobileNavService);
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  router = inject(Router);

  activeTab: string = 'home';

  selectTab(tab: string) { this.activeTab = tab; }

  goToAccount() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/mi-cuenta']);
    } else {
      this.router.navigate(['/login']);
    }
    this.activeTab = 'account';
  }

  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
