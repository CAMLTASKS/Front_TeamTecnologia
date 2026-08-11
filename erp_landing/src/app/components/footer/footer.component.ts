import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './footer.component.css',
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  subscribed = signal<boolean>(false);

  onSubscribe(event: Event) {
    event.preventDefault();
    this.subscribed.set(true);
  }
}
