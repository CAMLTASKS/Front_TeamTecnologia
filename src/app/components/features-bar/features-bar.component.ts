import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './features-bar.component.css',
  selector: 'app-features-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-bar.component.html',
})
export class FeaturesBarComponent {
  features = [
    { icon: 'fa fa-truck', title: 'Free Express Shipping', desc: 'On all orders above $150.00' },
    { icon: 'fa fa-refresh', title: '30 Days Money Back', desc: 'Hassle-free return policy' },
    { icon: 'fa fa-headphones', title: '24/7 Expert Support', desc: 'Direct access to technicians' },
    { icon: 'fa fa-lock', title: '100% Secure Payment', desc: 'Encrypted SSL checkout' }
  ];
}
