import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.css'
})
export class NotificationToastComponent implements OnDestroy {
  visible = signal<boolean>(true);
  
  notifications = [
    { title: 'Shrink T-Handle 28 Piece', location: 'Australia', timeAgo: '22 Minutes Ago', image: '/cdn/shop/files/sub-banner-1.jpg' },
    { title: 'Stripper With Cutting Tool', location: 'London', timeAgo: '33 Minutes Ago', image: '/cdn/shop/files/sub-banner-2.jpg' },
    { title: '20-Volt Impact Driver', location: 'New York', timeAgo: '5 Minutes Ago', image: '/cdn/shop/files/sub-banner-1.jpg' }
  ];

  currentNotification = signal(this.notifications[0]);
  private timer: any;
  private index = 0;

  constructor() {
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.notifications.length;
      this.currentNotification.set(this.notifications[this.index]);
    }, 8000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
