import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  styleUrl: './hero-slideshow.component.css',
  selector: 'app-hero-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-slideshow.component.html',
})
export class HeroSlideshowComponent implements OnDestroy {
  currentSlide = signal<number>(0);
  private intervalId: any;

  slides = [
    {
      title: 'Infraestructura & Servidores Cloud ERP',
      subtitle: 'TeamTecnologia Enterprise Hardware',
      description: 'Potencia empresarial con servidores Dell PowerEdge, almacenamiento NAS Synology y conectividad Cisco.',
      image: '/assets/banner.jpg'
    },
    {
      title: 'Laptops Corporativas & Workstations 4K',
      subtitle: 'Procesamiento de Alto Rendimiento',
      description: 'Laptops Lenovo ThinkPad, ASUS ROG e Intel i9 de 14ª generación preparados para ingeniería y desarrollo.',
      image: '/assets/banner2.jpg'
    },
    {
      title: 'Redes, Networking & Firewalls Fortinet',
      subtitle: 'Seguridad Perimetral & Conectividad Gigabit',
      description: 'Switches administrables PoE+, routers de alto flujo y appliances UTM para la red de tu compañía.',
      image: '/assets/banner3.jpg'
    },
    {
      title: 'Componentes & Tarjetas Gráficas NVIDIA RTX',
      subtitle: 'Cálculo Avanzado & Inteligencia Artificial',
      description: 'Procesadores Intel i9/Ryzen, GPUs RTX 4090 y almacenamiento SSD NVMe Samsung PRO de máxima velocidad.',
      image: '/assets/banner4.jpg'
    },
    {
      title: 'Seguridad IP, CCTV & Cámaras NVR 4K',
      subtitle: 'Videovigilancia Inteligente ERP',
      description: 'Sistemas de videovigilancia Hikvision con analítica de IA y grabación continua 4K.',
      image: '/assets/banner5.jpg'
    }
  ];

  constructor() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide.update(curr => (curr + 1) % this.slides.length);
  }

  prevSlide() {
    this.currentSlide.update(curr => (curr - 1 + this.slides.length) % this.slides.length);
  }

  setSlide(index: number) {
    this.currentSlide.set(index);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
