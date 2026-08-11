import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-deal-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-collection.component.html',
  styleUrl: './deal-collection.component.css',})
export class DealCollectionComponent implements OnDestroy {
  productService = inject(ProductService);
  cartService = inject(CartService);

  deal = this.productService.dealProduct();

  days = signal<number>(2);
  hours = signal<number>(14);
  minutes = signal<number>(35);
  seconds = signal<number>(50);

  private timer: any;

  constructor() {
    this.timer = setInterval(() => {
      if (this.seconds() > 0) {
        this.seconds.update(s => s - 1);
      } else {
        this.seconds.set(59);
        if (this.minutes() > 0) {
          this.minutes.update(m => m - 1);
        } else {
          this.minutes.set(59);
          if (this.hours() > 0) {
            this.hours.update(h => h - 1);
          }
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
