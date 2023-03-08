import { Component } from '@angular/core'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})

export class UsuarioComponent {
  usuarioNombre = "";
  usuarios = ['MAxi', 'Juan'];

  onAgregarUsuario() {
    this.usuarios.push(this.usuarioNombre)
  }
}
