import { Injectable, signal } from '@angular/core';

export interface OrderItem {
  productId: string | number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Pendiente_Pago' | 'Pago_Aprobado' | 'En_Preparacion' | 'Despachado' | 'Entregado' | 'Cancelado';
  total: number;
  items: OrderItem[];
  trackingCode?: string;
  carrier?: string;
  paymentMethod?: string;
  paymentRef?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private _orders = signal<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      date: '13 de Agosto, 2026',
      status: 'Despachado',
      total: 549000,
      trackingCode: 'SRV-9941820',
      carrier: 'Servientrega',
      paymentMethod: 'Wompi',
      paymentRef: 'WOMPI-884199',
      items: [
        { productId: '1', name: 'Teclado Mecánico Logitech MX Keys Mini', price: 275000, qty: 1, image: '/cdn/shop/files/4_100x100.svg' },
        { productId: '2', name: 'Mouse Ergonómico MX Master 3S', price: 199000, qty: 1, image: '/cdn/shop/files/4_100x100.svg' },
        { productId: '3', name: 'Hub USB-C Anker 9 en 1', price: 75000, qty: 1, image: '/cdn/shop/files/3_100x100.svg' }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      date: '10 de Agosto, 2026',
      status: 'Entregado',
      total: 1250000,
      paymentMethod: 'PSE',
      paymentRef: 'PSE-441992',
      items: [
        { productId: '4', name: 'Smartphone Samsung Galaxy S24 Ultra 512GB', price: 1250000, qty: 1, image: '/cdn/shop/files/6_100x100.svg' }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2026-003',
      date: '08 de Agosto, 2026',
      status: 'Pendiente_Pago',
      total: 125000,
      items: [
        { productId: '5', name: 'Cable HDMI 8K 2m Premium', price: 62500, qty: 2, image: '/cdn/shop/files/3_100x100.svg' }
      ]
    }
  ]);

  orders = this._orders.asReadonly();

  addOrder(order: Omit<Order, 'id'>) {
    const newOrder: Order = { ...order, id: Date.now().toString() };
    this._orders.update(list => [newOrder, ...list]);
    return newOrder;
  }

  getOrder(id: string): Order | undefined {
    return this._orders().find(o => o.id === id);
  }

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
}
