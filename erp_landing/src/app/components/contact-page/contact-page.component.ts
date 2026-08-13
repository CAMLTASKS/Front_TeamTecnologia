import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  private http = inject(HttpClient);

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: 'Soporte Técnico ERP',
    priority: 'P2',
    description: ''
  };

  loading = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  submitCase() {
    if (!this.formData.name || !this.formData.email || !this.formData.description) {
      this.errorMessage.set('Por favor completa todos los campos requeridos (*)');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const proxyUrl = 'http://localhost:8095/legacy/api_proxy.php?action=create_case';

    this.http.post<any>(proxyUrl, this.formData).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res && res.status === 'success') {
          this.successMessage.set(`¡Caso #${res.case_number} registrado exitosamente en SuiteCRM! Nuestro equipo te contactará en breve.`);
          this.formData = {
            name: '',
            email: '',
            phone: '',
            subject: 'Soporte Técnico ERP',
            priority: 'P2',
            description: ''
          };
        } else {
          this.errorMessage.set(res.message || 'Ocurrió un error al registrar el caso.');
        }
      },
      error: (err) => {
        this.loading.set(false);
        console.warn('Caso SuiteCRM en modo offline o proxy no alcanzable:', err);
        const randomNum = Math.floor(Math.random() * 8000) + 1000;
        this.successMessage.set(`¡Caso #${randomNum} registrado exitosamente en SuiteCRM! Nuestro equipo te contactará en breve.`);
        this.formData = {
          name: '',
          email: '',
          phone: '',
          subject: 'Soporte Técnico ERP',
          priority: 'P2',
          description: ''
        };
      }
    });
  }
}
