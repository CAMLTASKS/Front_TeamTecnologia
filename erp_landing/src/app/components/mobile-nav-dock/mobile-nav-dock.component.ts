import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { MobileNavService } from '../../core/services/mobile-nav.service';

@Component({
  selector: 'app-mobile-nav-dock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-nav-dock.component.html',
  styleUrl: './mobile-nav-dock.component.css'
})
export class MobileNavDockComponent {
  cartService = inject(CartService);
  mobileNavService = inject(MobileNavService);

  activeTab: string = 'home';

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
