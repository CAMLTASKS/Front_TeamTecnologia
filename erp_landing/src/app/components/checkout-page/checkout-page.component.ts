import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface CartProduct { id: string; name: string; price: number; qty: number; brand: string; }

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  step = signal<1|2|3>(1);
  loading = signal(false);
  orderPlaced = signal(false);
  orderNumber = '';
  summaryOpen = signal(false);

  cartItems: CartProduct[] = [
    { id:'1', name:'Teclado Mecánico Logitech MX Keys Mini', price:275000, qty:1, brand:'Logitech' },
    { id:'2', name:'Mouse Ergonómico MX Master 3S', price:199000, qty:1, brand:'Logitech' },
    { id:'3', name:'Hub USB-C Anker 9 en 1 4K HDMI', price:75000, qty:2, brand:'Anker' }
  ];

  shippingData = { firstName:'', lastName:'', email:'', phone:'', docType:'CC', docNumber:'', city:'', address:'', addressDetail:'', clientType:'Persona_Natural', companyName:'' };
  paymentData = { method:'wompi', cardNumber:'', cardName:'', expiry:'', cvv:'', saveCard:false };
  couponCode = '';
  couponApplied = signal(false);
  couponDiscount = 0;
  couponError = signal('');

  get subtotal() { return this.cartItems.reduce((s,i)=>s+i.price*i.qty,0); }
  get shipping() { return this.subtotal>=500000?0:15000; }
  get discount() { return this.couponApplied()?this.couponDiscount:0; }
  get total() { return this.subtotal+this.shipping-this.discount; }
  get totalItems() { return this.cartItems.reduce((s,i)=>s+i.qty,0); }

  applyCoupon() {
    this.couponError.set('');
    if (this.couponCode.toUpperCase()==='TEAM10') { this.couponDiscount=Math.round(this.subtotal*0.10); this.couponApplied.set(true); }
    else { this.couponError.set('Cupón inválido. Prueba TEAM10'); }
  }
  updateQty(item:CartProduct, d:number) { const nq=item.qty+d; if(nq<1){this.cartItems=this.cartItems.filter(i=>i.id!==item.id);return;} item.qty=nq; }
  removeItem(id:string) { this.cartItems=this.cartItems.filter(i=>i.id!==id); }
  nextStep() { this.step.update(s=>Math.min(s+1,3) as 1|2|3); window.scrollTo(0,0); }
  prevStep() { this.step.update(s=>Math.max(s-1,1) as 1|2|3); }
  placeOrder() {
    this.loading.set(true);
    setTimeout(()=>{ this.orderNumber='ORD-2026-'+Math.floor(Math.random()*9000+1000); this.loading.set(false); this.orderPlaced.set(true); },2000);
  }
}
