import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { LibrosComponent } from './libros/libros/libros.component';
import { LibroComponent } from './libro/libro/libro.component';

@NgModule({
  declarations: [               //componentes usados a futuro
    AppComponent,
    UsuarioComponent,
    LibrosComponent,
    LibroComponent
  ],
  imports: [                    //Modulos que seran usados a futuro
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],                //provee los servicios de nuestra app
  bootstrap: [AppComponent]     //componente principal de la appp
})
export class AppModule { }
