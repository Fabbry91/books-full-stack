import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  @Input() tituloLibro: string = '';
  @Output() libroClicket = new EventEmitter();

  constructor(private libServ: LibrosService) { }

  ngOnInit(): void {
  }

  onClicket() {
    //this.libroClicket.emit()
    this.libServ.eliminarLibro(this.tituloLibro)
  }

}
