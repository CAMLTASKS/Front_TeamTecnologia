import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileNavService } from '../../core/services/mobile-nav.service';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-drawer.component.html',
  styleUrl: './mobile-drawer.component.css'
})
export class MobileDrawerComponent {
  mobileNavService = inject(MobileNavService);

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
