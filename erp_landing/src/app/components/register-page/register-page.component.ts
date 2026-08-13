import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  
  step = signal(1);
  loading = signal(false);
  success = signal(false);
  error = signal('');
  showPassword = signal(false);

  formData = {
    clientType: 'Persona Natural',
    firstName: '',
    lastName: '',
    docType: 'CC',
    docNumber: '',
    phone: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  nextStep() {
    this.error.set('');
    if (this.step() === 1) {
      if (!this.formData.firstName || !this.formData.lastName || !this.formData.docNumber || !this.formData.phone || !this.formData.city) {
        this.error.set('Por favor completa todos los campos obligatorios.');
        return;
      }
      this.step.set(2);
    } else if (this.step() === 2) {
      if (!this.formData.email || !this.formData.password) {
        this.error.set('Completa el email y la contraseña.');
        return;
      }
      if (this.formData.password !== this.formData.confirmPassword) {
        this.error.set('Las contraseñas no coinciden.');
        return;
      }
      this.step.set(3);
    }
  }

  prevStep() {
    if (this.step() > 1) {
      this.step.update(s => s - 1);
      this.error.set('');
    }
  }

  submitRegister() {
    if (!this.formData.terms) {
      this.error.set('Debes aceptar los términos y condiciones.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    
    setTimeout(() => {
      this.loading.set(false);
      this.success.set(true);
      this.authService.login({
        name: this.formData.firstName + ' ' + this.formData.lastName,
        email: this.formData.email,
        phone: this.formData.phone,
        city: this.formData.city,
        docType: this.formData.docType,
        docNumber: this.formData.docNumber,
        clientType: this.formData.clientType
      });
    }, 1500);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }
}
