import { Component } from '@angular/core';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { HeaderComponent } from './components/header/header.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { HeroSlideshowComponent } from './components/hero-slideshow/hero-slideshow.component';
import { SubBannersComponent } from './components/sub-banners/sub-banners.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { DealCollectionComponent } from './components/deal-collection/deal-collection.component';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';
import { LatestBlogComponent } from './components/latest-blog/latest-blog.component';
import { BrandSliderComponent } from './components/brand-slider/brand-slider.component';
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
    LoadingOverlayComponent,
    HeaderComponent,
    CategorySliderComponent,
    HeroSlideshowComponent,
    SubBannersComponent,
    ProductTabsComponent,
    DealCollectionComponent,
    FeaturesBarComponent,
    LatestBlogComponent,
    BrandSliderComponent,
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
  title = 'Toolgard ERP Landing';
}
