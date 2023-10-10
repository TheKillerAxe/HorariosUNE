import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from 'src/database/database';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class menuComponent {
  Usuario : Usuario = new Usuario();

  constructor(public router: Router) { }

  navigate(route: string) {
    this.router.navigate([route], { state: this.Usuario });
  }
}