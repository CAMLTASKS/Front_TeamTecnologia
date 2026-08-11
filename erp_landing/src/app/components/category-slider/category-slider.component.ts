import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css',})
export class CategorySliderComponent {
  categories = [
    { name: 'Jackhammer', icon: '/cdn/shop/files/1_100x100.svg' },
    { name: 'Wrench Tool', icon: '/cdn/shop/files/2_100x100.svg' },
    { name: 'Circle Saw', icon: '/cdn/shop/files/3_100x100.svg' },
    { name: 'Power Saw', icon: '/cdn/shop/files/4_100x100.svg' },
    { name: 'Decker Tool', icon: '/cdn/shop/files/5_100x100.svg' },
    { name: 'Hammer Tool', icon: '/cdn/shop/files/6_100x100.svg' },
    { name: 'Drill Tool', icon: '/cdn/shop/files/7_100x100.svg' }
  ];
}
