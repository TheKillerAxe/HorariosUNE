import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})

export class menuComponent {
  Usuario : Usuario = new Usuario();

  constructor(public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
    console.log(this.Usuario);
  }

  navigate(route: string) {
    this.router.navigate([route], { state: this.Usuario });
  }
}