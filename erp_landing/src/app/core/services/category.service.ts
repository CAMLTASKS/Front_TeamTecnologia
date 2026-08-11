import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SubCategory {
  id: string;
  name: string;
  parent_id: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  is_parent: number;
  description?: string;
  subcategories: SubCategory[];
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  // Backend PHP Proxy Entrypoint (No client credentials in Angular!)
  private apiUrl = 'http://localhost:8095/legacy/api_proxy.php?action=categories';

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);

  // Default fallback icons mapping
  private iconMap: { [key: string]: string } = {
    'Herramientas Eléctricas': '/cdn/shop/files/1_100x100.svg',
    'Herramientas Manuales': '/cdn/shop/files/2_100x100.svg',
    'Taladros y Rotomartillos': '/cdn/shop/files/7_100x100.svg',
    'Esmeriles y Pulidoras': '/cdn/shop/files/3_100x100.svg',
    'Sierras Circulares y Caladoras': '/cdn/shop/files/4_100x100.svg',
    'Decker Tool': '/cdn/shop/files/5_100x100.svg',
    'Hammer Tool': '/cdn/shop/files/6_100x100.svg'
  };

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true);
    this.http.get<{ status: string; categories: Category[] }>(this.apiUrl).subscribe({
      next: (res) => {
        if (res && res.status === 'success' && res.categories) {
          const mapped = res.categories.map((cat, idx) => ({
            ...cat,
            icon: this.iconMap[cat.name] || `/cdn/shop/files/${(idx % 7) + 1}_100x100.svg`
          }));
          this.categories.set(mapped);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.warn('Backend SuiteCRM categories offline, using fallback:', err);
        // Fallback default categories
        this.categories.set([
          {
            id: '1',
            name: 'Herramientas Eléctricas',
            is_parent: 1,
            icon: '/cdn/shop/files/1_100x100.svg',
            subcategories: [
              { id: '11', name: 'Taladros y Rotomartillos', parent_id: '1' },
              { id: '12', name: 'Esmeriles y Pulidoras', parent_id: '1' },
              { id: '13', name: 'Sierras Circulares', parent_id: '1' }
            ]
          },
          {
            id: '2',
            name: 'Herramientas Manuales',
            is_parent: 1,
            icon: '/cdn/shop/files/2_100x100.svg',
            subcategories: [
              { id: '21', name: 'Llaves y Dados', parent_id: '2' },
              { id: '22', name: 'Martillos y Mazos', parent_id: '2' }
            ]
          }
        ]);
        this.loading.set(false);
      }
    });
  }
}
