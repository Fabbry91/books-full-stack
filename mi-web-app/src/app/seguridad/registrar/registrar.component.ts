import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Seguridad } from '../seguridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  emailInput: string = ''

  constructor(private servSeg: Seguridad) { }

  ngOnInit(): void {
  }

  registerUser(form: NgForm) {
    const { nombre, apellido, username, email, usuarioId, password } = form.value;
    this.servSeg.registeUser({ nombre, apellido, username, email, usuarioId, password })
  }
}
