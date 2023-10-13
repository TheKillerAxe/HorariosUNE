import { Component, OnInit } from '@angular/core';
import { Usuario } from '../database/database';

@Component({
  selector: 'app-altadocentes',
  templateUrl: './altadocentes.component.html',
  styleUrls: ['./altadocentes.component.css']
})
export class AltadocentesComponent {
  Usuario : Usuario = new Usuario();

  constructor() {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
    console.log(this.Usuario);
  }
}
