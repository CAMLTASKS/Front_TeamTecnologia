import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MobileNavService } from '../../core/services/mobile-nav.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-drawer.component.html',
  styleUrl: './mobile-drawer.component.css'
})
export class MobileDrawerComponent {
  mobileNavService = inject(MobileNavService);
  authService = inject(AuthService);
  cartService = inject(CartService);

  categories = [
    { name: 'Teclados & Periféricos', icon: '/cdn/shop/files/1_100x100.svg' },
    { name: 'Smartphones', icon: '/cdn/shop/files/2_100x100.svg' },
    { name: 'Hubs & Cables', icon: '/cdn/shop/files/3_100x100.svg' },
    { name: 'Audio & Headsets', icon: '/cdn/shop/files/4_100x100.svg' },
    { name: 'Laptops & Accesorios', icon: '/cdn/shop/files/5_100x100.svg' },
    { name: 'Cámaras & Vigilancia', icon: '/cdn/shop/files/6_100x100.svg' },
  ];

  close() { this.mobileNavService.closeDrawer(); }

  logout() {
    this.authService.logout();
    this.close();
  }
}
