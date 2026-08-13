import { Injectable, signal } from '@angular/core';

export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  docType?: string;
  docNumber?: string;
  clientType?: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<AuthUser | null>(null);

  constructor() {
    // Restore session from localStorage on boot
    const stored = localStorage.getItem('tt_user');
    if (stored) {
      try {
        this._user.set(JSON.parse(stored));
      } catch {
        localStorage.removeItem('tt_user');
      }
    }
  }

  user = this._user.asReadonly();

  isLoggedIn = () => this._user() !== null;

  login(user: AuthUser) {
    localStorage.setItem('tt_user', JSON.stringify(user));
    this._user.set(user);
  }

  logout() {
    localStorage.removeItem('tt_user');
    this._user.set(null);
  }

  getInitials(): string {
    const u = this._user();
    if (!u) return '?';
    return u.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }
}
