import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Seguridad } from '../../seguridad/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();
  statusUser: boolean = false;
  userSubscription: Subscription = new Subscription();

  constructor(private segServ: Seguridad) { }

  ngOnInit(): void {
    this.userSubscription = this.segServ.seguridadCambio.subscribe(status => {
      this.statusUser = status;
    })
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit()
  }

  logOut() {
    this.segServ.logout();
    this.userSubscription = this.segServ.seguridadCambio.subscribe(status => {
      this.statusUser = status;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
