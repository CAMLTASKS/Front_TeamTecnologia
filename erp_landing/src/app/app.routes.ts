import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogPageComponent },
  { path: 'nosotros', component: AboutPageComponent },
  { path: 'contacto', component: ContactPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registro', component: RegisterPageComponent },
  { path: 'mi-cuenta', component: AccountPageComponent },
  { path: 'carrito', component: CheckoutPageComponent },
  { path: '**', redirectTo: '' }
];
