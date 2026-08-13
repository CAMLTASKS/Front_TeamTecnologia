import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './notification-toast.component.css',
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-toast.component.html',
})
export class NotificationToastComponent implements OnDestroy {
  visible = signal<boolean>(true);
  currentNotification = signal({
    title: 'Laptop Lenovo ThinkPad X1 Carbon',
    location: 'Bogotá, CO',
    timeAgo: 'Hace 12 minutos',
    image: '/cdn/shop/files/1_100x100.svg'
  });

  private intervalId: any;

  notifications = [
    {
      title: 'Laptop Lenovo ThinkPad X1 Carbon Gen 11',
      location: 'Bogotá, CO',
      timeAgo: 'Hace 12 minutos',
      image: '/cdn/shop/files/1_100x100.svg'
    },
    {
      title: 'Servidor Dell PowerEdge R750 2U Xeon',
      location: 'Medellín, CO',
      timeAgo: 'Hace 24 minutos',
      image: '/cdn/shop/files/7_100x100.svg'
    },
    {
      title: 'Switch Cisco Catalyst 9300 48P PoE+',
      location: 'Cali, CO',
      timeAgo: 'Hace 38 minutos',
      image: '/cdn/shop/files/3_100x100.svg'
    },
    {
      title: 'Tarjeta Gráfica NVIDIA RTX 4090 24GB',
      location: 'Barranquilla, CO',
      timeAgo: 'Hace 45 minutos',
      image: '/cdn/shop/files/4_100x100.svg'
    }
  ];

  constructor() {
    let index = 0;
    this.intervalId = setInterval(() => {
      index = (index + 1) % this.notifications.length;
      this.currentNotification.set(this.notifications[index]);
      this.visible.set(true);
    }, 12000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
