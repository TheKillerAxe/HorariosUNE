import { Component } from '@angular/core';
import { Usuario } from '../database/database';
import { Router } from "@angular/router";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  Usuario : Usuario = new Usuario();

  constructor(private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
    
    if (this.Usuario.IdUsuario == "") {
      this.router.navigate(['']);
    }
  }
}
