import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Mock user service - replace with real auth later
const MOCK_USERS = [
  { email: 'demo@teamtecnologia.com', password: '123456', name: 'Carlos Maldonado' }
];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  formData = { email: '', password: '' };
  loading = signal(false);
  error = signal('');
  success = signal('');
  showPassword = signal(false);

  submitLogin() {
    if (!this.formData.email || !this.formData.password) {
      this.error.set('Por favor completa todos los campos.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    // Mock auth
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === this.formData.email && u.password === this.formData.password);
      if (user) {
        this.success.set(`¡Bienvenido de vuelta, ${user.name}! Redirigiendo a tu cuenta...`);
        localStorage.setItem('tt_user', JSON.stringify(user));
      } else {
        this.error.set('Correo o contraseña incorrectos. Prueba con demo@teamtecnologia.com / 123456');
      }
      this.loading.set(false);
    }, 1200);
  }

  togglePassword() { this.showPassword.update(v => !v); }
}
