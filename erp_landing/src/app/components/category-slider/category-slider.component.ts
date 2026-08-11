import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';

@Component({
  styleUrl: './category-slider.component.css',
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-slider.component.html'
})
export class CategorySliderComponent {
  categoryService = inject(CategoryService);
}
