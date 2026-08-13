import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogPageComponent },
  { path: 'nosotros', component: AboutPageComponent },
  { path: 'contacto', component: ContactPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: '**', redirectTo: '' }
];
