import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  companyStats = [
    { number: '+12 Años', label: 'Líderes en Tecnología ERP' },
    { number: '+850', label: 'Proyectos Corporativos Implementados' },
    { number: '99.9%', label: 'Disponibilidad de Infraestructura' },
    { number: '24/7', label: 'Soporte Técnico Especializado' }
  ];
}
