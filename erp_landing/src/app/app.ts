import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
