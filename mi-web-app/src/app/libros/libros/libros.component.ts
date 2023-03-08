import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit, OnDestroy {

  libros: string[] = []

  constructor(private libServ: LibrosService, private libroSubscriton: Subscription) {
  }

  ngOnInit(): void {
    this.libroSubscriton = this.libServ.librosSubject.subscribe(() => {
      this.libros = this.libServ.obtenerLibros();
    })
  }
  ngOnDestroy(): void {
    this.libroSubscriton.unsubscribe()
  }

  eliminarLibros(libro: any) {
    //this.libros = this.libros.filter(p => p !== libro)
  }

  guardarLibro(f: any) {
    if (f.valid) {
      this.libServ.agregarLibro(f.value.nombrelibro)
    }
  }

}
