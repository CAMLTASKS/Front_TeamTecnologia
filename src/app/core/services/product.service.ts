import { Injectable, signal } from '@angular/core';
import { Product, BlogArticle } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = signal<Product[]>([
    {
      id: 1,
      title: '20-Volt 1/4-In Variable Speed Cordless Impact Driver',
      price: 9.00,
      originalPrice: 12.00,
      vendor: 'Hammerhead',
      type: 'Decker Tool',
      sku: 'TG-HH-20V',
      image: '/cdn/shop/files/sub-banner-1.jpg',
      rating: 5,
      badge: '-25%',
      description: 'High torque cordless impact driver with variable speed trigger.'
    },
    {
      id: 2,
      title: 'Drill Screwdriver Brandix ALX 7054 200 Watts',
      price: 240.00,
      vendor: 'Hammerhead',
      type: 'Hammer Tool',
      sku: 'TG-HH-7054',
      image: '/cdn/shop/files/sub-banner-2.jpg',
      rating: 5,
      description: 'Ergonomic 200W drill screwdriver for wood and masonry.'
    },
    {
      id: 3,
      title: 'Professional Tools And Hardware Angle Grinder',
      price: 90.00,
      originalPrice: 97.00,
      vendor: 'Williams',
      type: 'Drill Tool',
      sku: 'TG-WM-AG',
      image: '/cdn/shop/files/sub-banner-1.jpg',
      rating: 5,
      badge: '-7%',
      description: 'Heavy duty angle grinder built for smooth metal cutting.'
    },
    {
      id: 4,
      title: 'Hammer 2-26 Drill Machine With Complete Set',
      price: 15.00,
      originalPrice: 19.00,
      vendor: 'Robert Bosch',
      type: 'Hammer Tool',
      sku: 'TG-RB-226',
      image: '/cdn/shop/files/sub-banner-2.jpg',
      rating: 5,
      badge: '-21%',
      description: 'Professional rotary hammer drill with chuck and accessories.'
    },
    {
      id: 5,
      title: 'Segmented Diamond Blade For Tile Cutting',
      price: 200.00,
      originalPrice: 230.00,
      vendor: 'Stanley',
      type: 'Decker Tool',
      sku: 'TG-ST-DB',
      image: '/cdn/shop/files/sub-banner-1.jpg',
      rating: 5,
      badge: '-13%',
      description: 'High performance diamond cutting blade for tiles and masonry.'
    },
    {
      id: 6,
      title: 'Bosch Professional Angle Grinder For Metal',
      price: 240.00,
      vendor: 'Dremel Edwards',
      type: 'Drill Tool',
      sku: 'TG-DE-AG',
      image: '/cdn/shop/files/sub-banner-2.jpg',
      rating: 5,
      description: 'Industrial metal grinder with safety guard and auxiliary handle.'
    }
  ]);

  dealProduct = signal<Product>({
    id: 1,
    title: '20-Volt 1/4-In Variable Speed Cordless Impact Driver',
    price: 9.00,
    originalPrice: 12.00,
    vendor: 'Hammerhead',
    type: 'Decker Tool',
    sku: 'TG-HH-20V',
    image: '/cdn/shop/files/sub-banner-1.jpg',
    rating: 5,
    badge: 'SPECIAL DEAL',
    description: 'High torque cordless impact driver with variable speed trigger.'
  });

  blogs = signal<BlogArticle[]>([
    {
      id: 1,
      title: 'Top 10 Must-Have Cordless Power Tools for 2026',
      author: 'Admin',
      date: 'Aug 10, 2026',
      commentsCount: 3,
      excerpt: 'Discover the latest breakthroughs in battery technology and industrial tools.',
      image: '/cdn/shop/files/main-banner-1_1600x.jpg'
    },
    {
      id: 2,
      title: 'Essential Safety Guidelines for High Torque Impact Drivers',
      author: 'Safety Expert',
      date: 'Aug 05, 2026',
      commentsCount: 7,
      excerpt: 'Proper PPE, eye protection, and secure clamping techniques.',
      image: '/cdn/shop/files/main-banner-2_1600x.jpg'
    }
  ]);
}
