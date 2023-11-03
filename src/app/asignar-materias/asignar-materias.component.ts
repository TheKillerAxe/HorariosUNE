import { Component } from '@angular/core';
import { Usuario } from '../database/database';
import { Router } from "@angular/router";

@Component({
  selector: 'app-asignar-materias',
  templateUrl: './asignar-materias.component.html',
  styleUrls: ['./asignar-materias.component.css']
})
export class AsignarMateriasComponent {
  Usuario : Usuario = new Usuario();

  constructor(private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }
  }
}
