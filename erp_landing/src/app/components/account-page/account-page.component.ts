import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Pendiente_Pago' | 'Pago_Aprobado' | 'En_Preparacion' | 'Despachado' | 'Entregado' | 'Cancelado';
  total: number;
  items: number;
  trackingCode?: string;
  carrier?: string;
  products: { name: string; qty: number; price: number; image: string; }[];
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: string;
}

interface RMAItem {
  id: string;
  rmaNumber: string;
  product: string;
  serial: string;
  reason: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
  activeTab = signal<'dashboard' | 'pedidos' | 'favoritos' | 'garantias' | 'perfil'>('dashboard');
  selectedOrder = signal<Order | null>(null);
  
  user = {
    name: 'Carlos Maldonado',
    email: 'carlos@teamtecnologia.com',
    phone: '(+57) 300 123 4567',
    city: 'Bogotá D.C.',
    docType: 'CC',
    docNumber: '1.234.567.890',
    clientType: 'Persona Natural',
    memberSince: 'Agosto 2025',
    avatar: 'CM'
  };

  mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      date: '13 de Agosto, 2026',
      status: 'Despachado',
      total: 549000,
      items: 3,
      trackingCode: 'SRV-9941820',
      carrier: 'Servientrega',
      products: [
        { name: 'Teclado Mecánico Logitech MX Keys Mini', qty: 1, price: 275000, image: '/cdn/shop/files/4_100x100.svg' },
        { name: 'Mouse Ergonómico MX Master 3S', qty: 1, price: 199000, image: '/cdn/shop/files/4_100x100.svg' },
        { name: 'Hub USB-C Anker 9 en 1', qty: 1, price: 75000, image: '/cdn/shop/files/3_100x100.svg' }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      date: '10 de Agosto, 2026',
      status: 'Entregado',
      total: 1250000,
      items: 1,
      products: [
        { name: 'Smartphone Samsung Galaxy S24 Ultra 512GB', qty: 1, price: 1250000, image: '/cdn/shop/files/6_100x100.svg' }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2026-003',
      date: '08 de Agosto, 2026',
      status: 'Pendiente_Pago',
      total: 125000,
      items: 2,
      products: [
        { name: 'Cable HDMI 8K 2m Premium', qty: 2, price: 62500, image: '/cdn/shop/files/3_100x100.svg' }
      ]
    }
  ];

  mockWishlist: WishlistItem[] = [
    { id: '1', name: 'Laptop Lenovo ThinkPad X1 Carbon Gen 11', price: 5500000, originalPrice: 6200000, image: '/cdn/shop/files/1_100x100.svg', stock: 'Disponible' },
    { id: '2', name: 'Monitor Dell 4K 27" IPS UltraSharp', price: 1850000, originalPrice: 2100000, image: '/cdn/shop/files/1_100x100.svg', stock: 'Bajo Pedido' },
    { id: '3', name: 'Auriculares Sony WH-1000XM5 Noise Cancelling', price: 1100000, originalPrice: 1100000, image: '/cdn/shop/files/4_100x100.svg', stock: 'Disponible' }
  ];

  mockRMA: RMAItem[] = [
    { id: '1', rmaNumber: 'RMA-8041', product: 'Teclado Logitech MX Keys', serial: 'LGT20241103', reason: 'Falla De Fabrica', status: 'En Revisión Técnica', date: '05 de Agosto, 2026' }
  ];

  isRmaFormVisible = signal(false);

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'Pendiente_Pago': 'Pendiente de Pago',
      'Pago_Aprobado': 'Pago Aprobado',
      'En_Preparacion': 'En Preparación',
      'Despachado': 'Despachado',
      'Entregado': 'Entregado',
      'Cancelado': 'Cancelado'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'Pendiente_Pago': 'badge-warning',
      'Pago_Aprobado': 'badge-info',
      'En_Preparacion': 'badge-primary',
      'Despachado': 'badge-shipping',
      'Entregado': 'badge-success',
      'Cancelado': 'badge-danger'
    };
    return classes[status] || 'badge-default';
  }

  openOrder(order: Order) { this.selectedOrder.set(order); }
  closeOrder() { this.selectedOrder.set(null); }
  removeFromWishlist(id: string) { this.mockWishlist = this.mockWishlist.filter(w => w.id !== id); }
  logout() { localStorage.removeItem('tt_user'); window.location.href = '/'; }

  toggleRmaForm() { this.isRmaFormVisible.set(!this.isRmaFormVisible()); }
}
