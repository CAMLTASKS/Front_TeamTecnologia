import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

const MOCK_USERS = [
  { email: 'demo@teamtecnologia.com', password: '123456', name: 'Carlos Maldonado', phone: '(+57) 300 123 4567', city: 'Bogotá D.C.', docType: 'CC', docNumber: '1.234.567.890', clientType: 'Persona Natural' }
];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  formData = { email: '', password: '' };
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  submitLogin() {
    if (!this.formData.email || !this.formData.password) { this.error.set('Completa todos los campos.'); return; }
    this.loading.set(true); this.error.set('');
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === this.formData.email && u.password === this.formData.password);
      if (user) { this.authService.login(user); this.router.navigate(['/mi-cuenta']); }
      else { this.error.set('Credenciales incorrectas. Prueba: demo@teamtecnologia.com / 123456'); }
      this.loading.set(false);
    }, 1000);
  }
  togglePassword() { this.showPassword.update(v => !v); }
}
