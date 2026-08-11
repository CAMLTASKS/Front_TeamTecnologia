import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8095/legacy/api_proxy.php?action=products';

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  selectedCategoryId = signal<string>('');

  dealProduct = signal<Product>({
    id: '99',
    title: 'Rotomartillo 20V Cordless Heavy Duty',
    vendor: 'Toolgard Industrial',
    price: 150.00,
    originalPrice: 199.00,
    rating: 5,
    reviewsCount: 38,
    image: '/cdn/shop/files/7_100x100.svg',
    description: 'Rotomartillo 20V inalámbrico con maletín y 2 baterías de litio'
  });

  blogs = signal<any[]>([
    {
      id: 1,
      title: 'Cómo elegir la mejor herramienta eléctrica para tu taller ERP',
      date: '10 de Agosto, 2026',
      author: 'Equipo Técnico',
      image: '/cdn/shop/files/1_100x100.svg',
      excerpt: 'Descubre los parámetros clave para evaluar rendimiento, torque y durabilidad en proyectos industriales.'
    },
    {
      id: 2,
      title: 'Mantenimiento preventivo para esmeriles y rotomartillos',
      date: '08 de Agosto, 2026',
      author: 'Ingeniería ERP',
      image: '/cdn/shop/files/3_100x100.svg',
      excerpt: 'Guía de limpieza y reemplazo de carbones para prolongar la vida útil de tus equipos.'
    }
  ]);

  constructor() {
    this.loadProducts();
  }

  loadProducts(categoryId?: string) {
    this.loading.set(true);
    this.selectedCategoryId.set(categoryId || '');

    let url = this.apiUrl;
    if (categoryId) {
      url += `&category_id=${encodeURIComponent(categoryId)}`;
    }

    this.http.get<{ status: string; products: any[] }>(url).subscribe({
      next: (res) => {
        if (res && res.status === 'success' && res.products) {
          const mapped: Product[] = res.products.map((p) => ({
            id: p.id,
            title: p.title,
            vendor: p.part_number ? `SKU: ${p.part_number}` : 'ERP Toolgard',
            price: p.price,
            originalPrice: p.cost ? p.price * 1.2 : undefined,
            rating: p.rating || 5,
            reviewsCount: p.reviews_count || 12,
            image: p.image || '/cdn/shop/files/1_100x100.svg',
            badge: p.part_number ? p.part_number : undefined,
            description: p.description || ''
          }));
          this.products.set(mapped);
        } else {
          this.products.set([]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.warn('Backend SuiteCRM products offline or failed, using fallback:', err);
        this.products.set([
          {
            id: '1',
            title: 'Rotomartillo 20V Cordless Industrial',
            vendor: 'TAL-20V-001',
            price: 150.00,
            originalPrice: 180.00,
            rating: 5,
            reviewsCount: 24,
            image: '/cdn/shop/files/7_100x100.svg',
            badge: 'TAL-20V',
            description: 'Rotomartillo inalámbrico 20V'
          },
          {
            id: '2',
            title: 'Esmeril Angular 710W Professional',
            vendor: 'ESM-710W-002',
            price: 85.00,
            originalPrice: 105.00,
            rating: 5,
            reviewsCount: 19,
            image: '/cdn/shop/files/3_100x100.svg',
            badge: 'ESM-710W',
            description: 'Esmeril angular 710W'
          }
        ]);
        this.loading.set(false);
      }
    });
  }
}
