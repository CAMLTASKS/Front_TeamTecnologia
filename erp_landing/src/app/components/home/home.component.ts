import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSlideshowComponent } from '../hero-slideshow/hero-slideshow.component';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { ProductTabsComponent } from '../product-tabs/product-tabs.component';
import { SubBannersComponent } from '../sub-banners/sub-banners.component';
import { DealCollectionComponent } from '../deal-collection/deal-collection.component';
import { FeaturesBarComponent } from '../features-bar/features-bar.component';
import { LatestBlogComponent } from '../latest-blog/latest-blog.component';
import { BrandSliderComponent } from '../brand-slider/brand-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSlideshowComponent,
    CategorySliderComponent,
    ProductTabsComponent,
    SubBannersComponent,
    DealCollectionComponent,
    FeaturesBarComponent,
    LatestBlogComponent,
    BrandSliderComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
