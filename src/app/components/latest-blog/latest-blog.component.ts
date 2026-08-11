import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';

@Component({
  styleUrl: './latest-blog.component.css',
  selector: 'app-latest-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-blog.component.html',
})
export class LatestBlogComponent {
  productService = inject(ProductService);
}
