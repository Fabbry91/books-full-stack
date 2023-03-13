import { Usuario } from './usuario.module'
import { LoginData } from './login-data.module'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Seguridad {

  seguridadCambio = new Subject<boolean>();
  private user?: Usuario | null = null;

  constructor(private router: Router) { }

  registeUser(usr: Usuario) {
    this.user = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellido: usr.apellido,
      username: usr.username,
      password: usr.password
    };
    this.seguridadCambio.next(true)
    this.router.navigate(['/'])
  }

  login(loginData: LoginData) {
    this.user = {
      email: loginData.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellido: '',
      username: '',
      password: loginData.password
    };
    this.seguridadCambio.next(true)
    this.router.navigate(['/'])
  }

  logout() {
    this.user = null;
    this.seguridadCambio.next(false)
    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.user };
  }
}
