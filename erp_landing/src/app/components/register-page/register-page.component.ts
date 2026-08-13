import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  step = signal(1); // 1: datos personales, 2: datos de cuenta, 3: confirmacion
  loading = signal(false);
  error = signal('');
  success = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  formData = {
    firstName: '',
    lastName: '',
    docType: 'CC',
    docNumber: '',
    phone: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
    clientType: 'Persona_Natural',
    acceptTerms: false
  };

  goToStep(n: number) { this.step.set(n); this.error.set(''); }

  validateStep1(): boolean {
    if (!this.formData.firstName || !this.formData.lastName || !this.formData.phone || !this.formData.city) {
      this.error.set('Completa todos los campos requeridos (*)');
      return false;
    }
    return true;
  }

  nextStep() {
    if (this.step() === 1 && !this.validateStep1()) return;
    if (this.step() === 2) {
      if (!this.formData.email || !this.formData.password) { this.error.set('Completa email y contraseña'); return; }
      if (this.formData.password !== this.formData.confirmPassword) { this.error.set('Las contraseñas no coinciden'); return; }
    }
    this.error.set('');
    this.step.update(s => s + 1);
  }

  submitRegister() {
    if (!this.formData.acceptTerms) { this.error.set('Debes aceptar los términos y condiciones'); return; }
    this.loading.set(true);
    setTimeout(() => {
      localStorage.setItem('tt_user', JSON.stringify({ name: this.formData.firstName, email: this.formData.email }));
      this.success.set(true);
      this.loading.set(false);
    }, 1500);
  }
  
  togglePassword() { this.showPassword.update(v => !v); }
  toggleConfirmPassword() { this.showConfirmPassword.update(v => !v); }

  getPasswordStrength(): string {
    const pw = this.formData.password;
    if (!pw) return 'none';
    if (pw.length < 6) return 'weak';
    if (pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) return 'strong';
    return 'medium';
  }
}
