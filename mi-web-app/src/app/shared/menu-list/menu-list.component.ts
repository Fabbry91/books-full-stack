import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Seguridad } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  @Output() menuToggle = new EventEmitter<void>();
  statusUser: boolean = false;
  userSubscription: Subscription = new Subscription();

  constructor(private segServ: Seguridad) { }

  ngOnInit(): void {
    this.userSubscription = this.segServ.seguridadCambio.subscribe(status => {
      this.statusUser = status;
    })
  }

  onCloseMenu(){
    this.menuToggle.emit()
  }

  logOut() {
    this.segServ.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
