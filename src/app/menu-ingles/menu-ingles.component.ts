import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'app-menu-ingles',
  templateUrl: './menu-ingles.component.html',
  styleUrls: ['./menu-ingles.component.css']
})
export class MenuInglesComponent {
  Usuario : Usuario = new Usuario();
  Handle = true;

  constructor(public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.CambiosRecientes) {
      this.Usuario.CambiosRecientes = false;
      this.router.navigate(['configuracion'], { state: this.Usuario });
    }

    if (this.Usuario.TipoUsuario != "Ingles") {
      this.router.navigate(['']);
    }
  }

  navigate(route: string) {
    this.router.navigate([route], { state: this.Usuario });
  }
}
