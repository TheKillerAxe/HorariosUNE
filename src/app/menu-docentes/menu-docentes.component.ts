import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'app-menu-docentes',
  templateUrl: './menu-docentes.component.html',
  styleUrls: ['./menu-docentes.component.css']
})
export class MenuDocentesComponent {
  Usuario : Usuario = new Usuario();

  constructor(public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
  }

  navigate(route: string) {
    this.router.navigate([route], { state: this.Usuario });
  }
}
