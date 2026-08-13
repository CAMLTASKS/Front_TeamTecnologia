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

  private apiUrl = 'http://localhost:8095/legacy/api_proxy.php?action=categories';

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);

  private iconMap: { [key: string]: string } = {
    'Computadores & Laptops': '/cdn/shop/files/1_100x100.svg',
    'Servidores & Cloud ERP': '/cdn/shop/files/7_100x100.svg',
    'Redes & Networking': '/cdn/shop/files/3_100x100.svg',
    'Componentes & Hardware': '/cdn/shop/files/4_100x100.svg',
    'Seguridad & CCTV': '/cdn/shop/files/6_100x100.svg'
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
        console.warn('Backend SuiteCRM categories offline, using technology fallbacks:', err);
        this.categories.set([
          {
            id: 'cat-tech-1',
            name: 'Computadores & Laptops',
            is_parent: 1,
            icon: '/cdn/shop/files/1_100x100.svg',
            subcategories: [
              { id: 'sub-tech-1-1', name: 'Laptops Corporativos & Gamer', parent_id: 'cat-tech-1' },
              { id: 'sub-tech-1-2', name: 'Workstations & All-in-One', parent_id: 'cat-tech-1' }
            ]
          },
          {
            id: 'cat-tech-2',
            name: 'Servidores & Cloud ERP',
            is_parent: 1,
            icon: '/cdn/shop/files/7_100x100.svg',
            subcategories: [
              { id: 'sub-tech-2-1', name: 'Servidores Rack & Tower 2U', parent_id: 'cat-tech-2' },
              { id: 'sub-tech-2-2', name: 'Almacenamiento SAN / NAS', parent_id: 'cat-tech-2' }
            ]
          },
          {
            id: 'cat-tech-3',
            name: 'Redes & Networking',
            is_parent: 1,
            icon: '/cdn/shop/files/3_100x100.svg',
            subcategories: [
              { id: 'sub-tech-3-1', name: 'Switches & Routers Empresariales', parent_id: 'cat-tech-3' },
              { id: 'sub-tech-3-2', name: 'Firewalls & Seguridad de Red', parent_id: 'cat-tech-3' }
            ]
          }
        ]);
        this.loading.set(false);
      }
    });
  }
}
