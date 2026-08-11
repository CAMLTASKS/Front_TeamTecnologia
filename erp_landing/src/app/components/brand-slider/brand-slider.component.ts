import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './brand-slider.component.css',
  selector: 'app-brand-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-slider.component.html',
})
export class BrandSliderComponent {
  brands = [
    { name: 'DEWALT', icon: 'fa fa-wrench' },
    { name: 'MAKITA', icon: 'fa fa-cog' },
    { name: 'BOSCH', icon: 'fa fa-bolt' },
    { name: 'MILWAUKEE', icon: 'fa fa-fire' },
    { name: 'STANLEY', icon: 'fa fa-shield' }
  ];
}
