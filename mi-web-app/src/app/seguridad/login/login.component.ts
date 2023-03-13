import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Seguridad } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private segServ: Seguridad) { }

  ngOnInit(): void {
  }

  onSave(form: NgForm) {
    const { email, password } = form.value;
    this.segServ.login({ email, password });
  }
}
