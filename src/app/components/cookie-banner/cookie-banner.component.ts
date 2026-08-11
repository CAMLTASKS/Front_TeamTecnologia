import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './cookie-banner.component.css',
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
})
export class CookieBannerComponent {
  visible = signal<boolean>(true);

  accept() {
    this.visible.set(false);
  }
}
