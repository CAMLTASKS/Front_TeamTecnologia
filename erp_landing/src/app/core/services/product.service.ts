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
    id: 'prod-tech-1',
    title: 'Laptop Lenovo ThinkPad X1 Carbon Gen 11 Intel i7 32GB 1TB SSD',
    vendor: 'LAP-TP-X1',
    price: 1850.00,
    originalPrice: 2190.00,
    rating: 5,
    reviewsCount: 42,
    image: '/cdn/shop/files/1_100x100.svg',
    badge: 'OFERTA ERP',
    description: 'Ultrabook corporativo con pantalla 14 IPS 4K y chasis de fibra de carbono'
  });

  blogs = signal<any[]>([
    {
      id: 1,
      title: 'Cómo estructurar la arquitectura de servidores para tu sistema ERP',
      date: '12 de Agosto, 2026',
      author: 'Ingeniería TeamTecnologia',
      image: '/cdn/shop/files/7_100x100.svg',
      excerpt: 'Guía de selección de servidores rack 2U, virtualización con Proxmox/VMware y alta disponibilidad.'
    },
    {
      id: 2,
      title: 'Seguridad perimetral y optimización de switches PoE+ Gigabit',
      date: '10 de Agosto, 2026',
      author: 'Especialista en Redes',
      image: '/cdn/shop/files/3_100x100.svg',
      excerpt: 'Implementación de VLANs, firewalls Fortinet y balanceo de carga para empresas en crecimiento.'
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
            vendor: p.part_number ? `SKU: ${p.part_number}` : 'TeamTecnologia ERP',
            price: p.price,
            originalPrice: p.cost ? p.price * 1.2 : undefined,
            rating: p.rating || 5,
            reviewsCount: p.reviews_count || 18,
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
        console.warn('Backend SuiteCRM products offline or failed, using technology fallbacks:', err);
        this.products.set([
          {
            id: 'prod-tech-1',
            title: 'Laptop Lenovo ThinkPad X1 Carbon Gen 11 Intel i7 32GB',
            vendor: 'LAP-TP-X1',
            price: 1850.00,
            originalPrice: 2190.00,
            rating: 5,
            reviewsCount: 42,
            image: '/cdn/shop/files/1_100x100.svg',
            badge: 'LAP-TP-X1',
            description: 'Ultrabook corporativo de 14 pulgadas 4K'
          },
          {
            id: 'prod-tech-3',
            title: 'Servidor Dell PowerEdge R750 2U Xeon Silver 64GB',
            vendor: 'SER-DELL-R750',
            price: 3400.00,
            originalPrice: 3890.00,
            rating: 5,
            reviewsCount: 29,
            image: '/cdn/shop/files/7_100x100.svg',
            badge: 'SER-R750',
            description: 'Servidor en rack 2U para SuiteCRM y base de datos'
          }
        ]);
        this.loading.set(false);
      }
    });
  }
}
