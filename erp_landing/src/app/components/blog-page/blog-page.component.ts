import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface KBArticle {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  views: number;
}

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent {
  private http = inject(HttpClient);

  articles = signal<KBArticle[]>([]);
  loading = signal<boolean>(false);
  selectedArticle = signal<KBArticle | null>(null);

  constructor() {
    this.loadKBArticles();
  }

  loadKBArticles() {
    this.loading.set(true);
    const proxyUrl = 'http://localhost:8095/legacy/api_proxy.php?action=kb';

    this.http.get<any>(proxyUrl).subscribe({
      next: (res) => {
        if (res && res.status === 'success' && res.articles) {
          this.articles.set(res.articles);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.warn('SuiteCRM Knowledge Base API error, loading default KB articles:', err);
        this.articles.set([
          {
            id: 'kb-1',
            title: 'Guía de selección de teclados mecánicos y mouses ergonómicos',
            author: 'Soporte TeamTecnologia',
            date: '13 de Agosto, 2026',
            category: 'Accesorios & Periféricos',
            excerpt: 'Análisis detallado de switches mecánicos, ergonomía en oficinas de desarrollo y conectividad Bluetooth multidispositivo.',
            image: '/cdn/shop/files/4_100x100.svg',
            views: 1420
          },
          {
            id: 'kb-2',
            title: 'Optimización de hubs USB-C 4K y transmisión 8K HDMI en estaciones de trabajo',
            author: 'Ingeniería de Hardware',
            date: '11 de Agosto, 2026',
            category: 'Conectividad',
            excerpt: 'Cómo elegir adaptadores de carga PD de 100W y cables de alta velocidad para monitores de diseño e ingeniería.',
            image: '/cdn/shop/files/3_100x100.svg',
            views: 980
          },
          {
            id: 'kb-3',
            title: 'Configuración e integración de SuiteCRM V8 con catálogo de accesorios ERP',
            author: 'Equipo de Desarrollo ERP',
            date: '08 de Agosto, 2026',
            category: 'Sistemas ERP',
            excerpt: 'Pasos para conectar la API de productos de SuiteCRM con el frontend Angular y sincronización de inventarios.',
            image: '/cdn/shop/files/7_100x100.svg',
            views: 2150
          }
        ]);
        this.loading.set(false);
      }
    });
  }

  openArticle(article: KBArticle) {
    this.selectedArticle.set(article);
  }

  closeArticle() {
    this.selectedArticle.set(null);
  }
}
