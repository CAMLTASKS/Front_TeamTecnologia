import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal<boolean>(true);

  constructor() {
    // Automatically hide preloader after 1.2s on initial page load
    setTimeout(() => {
      this.hideLoading();
    }, 1200);
  }

  showLoading() {
    this.isLoading.set(true);
  }

  hideLoading() {
    this.isLoading.set(false);
  }
}
