import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './hero-slideshow.component.css',
  selector: 'app-hero-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-slideshow.component.html',
})
export class HeroSlideshowComponent implements OnDestroy {
  currentSlide = signal<number>(0);
  private intervalId: any;

  slides = [
    {
      title: 'Accessories Catalog Power Tools',
      subtitle: 'Premium Heavy Duty Collection',
      description: 'Engineered for maximum torque, precision, and all-day endurance on professional construction sites.',
      image: '/cdn/shop/files/main-banner-1_1600x.jpg'
    },
    {
      title: 'Multifunction New Cordless Tools',
      subtitle: 'Next-Gen 20V Brushless Motors',
      description: 'Cordless mobility with corded power performance. Lightweight ergonomics built for heavy industrial usage.',
      image: '/cdn/shop/files/main-banner-2_1600x.jpg'
    }
  ];

  constructor() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide.update(curr => (curr + 1) % this.slides.length);
  }

  prevSlide() {
    this.currentSlide.update(curr => (curr - 1 + this.slides.length) % this.slides.length);
  }

  setSlide(index: number) {
    this.currentSlide.set(index);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
