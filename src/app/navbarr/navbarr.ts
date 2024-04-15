import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../database/database';

@Component({
  selector: 'navbarr',
  templateUrl: './navbarr.html',
  styleUrls: ['./navbarr.css']
})
export class navbarComponent {
  @Input() Usuario : Usuario = new Usuario();
  @Input() Handle : boolean = false;

  constructor(public router : Router) { }

  obtenerReferencia(): string {
    if (this.Usuario.TipoUsuario == "Admin") {
      return "admin";
    }
    if (this.Usuario.TipoUsuario == "Maestro") {
      return "docente";
    }
    if (this.Usuario.TipoUsuario == "Ingles") {
      return "ingles";
    }
    return "";
  }

  navigate(referencia : string) {
    this.router.navigate([referencia], {state : this.Usuario});
  }
}