import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSlideshowComponent } from '../hero-slideshow/hero-slideshow.component';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { CatalogViewComponent } from '../catalog-view/catalog-view.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSlideshowComponent,
    CategorySliderComponent,
    CatalogViewComponent
  ],
  templateUrl: './catalog-page.component.html'
})
export class CatalogPageComponent {}
