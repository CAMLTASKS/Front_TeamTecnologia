import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface OrderProduct { name: string; qty: number; price: number; }
interface Order {
  id: string; orderNumber: string; date: string;
  status: 'Pendiente_Pago'|'Pago_Aprobado'|'En_Preparacion'|'Despachado'|'Entregado'|'Cancelado';
  total: number; items: number; trackingCode?: string; carrier?: string;
  paymentMethod?: string; paymentRef?: string;
  products: OrderProduct[];
}
interface WishlistItem { id: string; name: string; price: number; originalPrice: number; stock: string; brand: string; }
interface RMAItem { id: string; rmaNumber: string; product: string; serial: string; reason: string; status: string; date: string; }

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
  activeTab = signal<'overview'|'pedidos'|'favoritos'|'garantias'|'perfil'>('overview');
  selectedOrder = signal<Order | null>(null);
  showRmaForm = signal(false);

  user = { name: 'Carlos Maldonado', email: 'carlos@teamtecnologia.com', phone: '(+57) 300 123 4567', city: 'Bogotá D.C.', docType: 'CC', docNumber: '1.234.567.890', clientType: 'Persona Natural', memberSince: 'Agosto 2025' };

  mockOrders: Order[] = [
    { id:'1', orderNumber:'ORD-2026-001', date:'13 Ago 2026', status:'Despachado', total:549000, items:3, trackingCode:'SRV-9941820', carrier:'Servientrega', paymentMethod:'Wompi', paymentRef:'WOMPI-884199',
      products:[{name:'Teclado Mecánico Logitech MX Keys Mini',qty:1,price:275000},{name:'Mouse MX Master 3S',qty:1,price:199000},{name:'Hub USB-C Anker 9 en 1',qty:1,price:75000}] },
    { id:'2', orderNumber:'ORD-2026-002', date:'10 Ago 2026', status:'Entregado', total:1250000, items:1, paymentMethod:'PSE', paymentRef:'PSE-441992',
      products:[{name:'Samsung Galaxy S24 Ultra 512GB',qty:1,price:1250000}] },
    { id:'3', orderNumber:'ORD-2026-003', date:'08 Ago 2026', status:'Pendiente_Pago', total:125000, items:2,
      products:[{name:'Cable HDMI 8K 2m Premium',qty:2,price:62500}] }
  ];

  mockWishlist: WishlistItem[] = [
    { id:'1', name:'Laptop Lenovo ThinkPad X1 Carbon Gen 11', price:5500000, originalPrice:6200000, stock:'Disponible', brand:'Lenovo' },
    { id:'2', name:'Monitor Dell 4K 27" IPS UltraSharp', price:1850000, originalPrice:2100000, stock:'Bajo Pedido', brand:'Dell' },
    { id:'3', name:'Auriculares Sony WH-1000XM5', price:1100000, originalPrice:1100000, stock:'Disponible', brand:'Sony' }
  ];

  mockRMA: RMAItem[] = [
    { id:'1', rmaNumber:'RMA-8041', product:'Teclado Logitech MX Keys', serial:'LGT20241103', reason:'Falla De Fabrica', status:'En Revisión Técnica', date:'05 Ago 2026' }
  ];

  getInitials() { return this.user.name.split(' ').map(p=>p[0]).slice(0,2).join(''); }

  getStatusLabel(s: string): string {
    return ({'Pendiente_Pago':'Pendiente Pago','Pago_Aprobado':'Pago Aprobado','En_Preparacion':'En Preparación','Despachado':'Despachado','Entregado':'Entregado','Cancelado':'Cancelado'} as any)[s] || s;
  }
  getStatusIcon(s: string): string {
    return ({'Pendiente_Pago':'fa-clock-o','Pago_Aprobado':'fa-check','En_Preparacion':'fa-cog','Despachado':'fa-truck','Entregado':'fa-check-circle','Cancelado':'fa-times-circle'} as any)[s] || 'fa-circle';
  }
  getStatusClass(s: string): string {
    return ({'Pendiente_Pago':'status-pending','Pago_Aprobado':'status-approved','En_Preparacion':'status-preparing','Despachado':'status-shipped','Entregado':'status-delivered','Cancelado':'status-cancelled'} as any)[s] || '';
  }

  getOrderProgress(status: string): number {
    const map: any = {'Pendiente_Pago':1,'Pago_Aprobado':2,'En_Preparacion':3,'Despachado':4,'Entregado':5};
    return map[status] || 0;
  }

  removeFromWishlist(id: string) { this.mockWishlist = this.mockWishlist.filter(w => w.id !== id); }
  logout() { localStorage.removeItem('tt_user'); window.location.href = '/'; }
  openOrder(o: Order) { this.selectedOrder.set(o); }
  closeOrder() { this.selectedOrder.set(null); }
}
