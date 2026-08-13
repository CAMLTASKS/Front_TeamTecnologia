import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { QuickViewModalComponent } from './components/quick-view-modal/quick-view-modal.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';
import { MobileNavDockComponent } from './components/mobile-nav-dock/mobile-nav-dock.component';
import { MobileDrawerComponent } from './components/mobile-drawer/mobile-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoadingOverlayComponent,
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    QuickViewModalComponent,
    CookieBannerComponent,
    NotificationToastComponent,
    MobileNavDockComponent,
    MobileDrawerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'TeamTecnologia ERP Landing';
  router = inject(Router);
  isAuthRoute = false;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects.split('?')[0];
      this.isAuthRoute = url === '/login' || url === '/registro';
    });
  }
}
