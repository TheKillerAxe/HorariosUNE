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

  constructor(public router : Router) { }

  navigate(referencia : string) {
    this.router.navigate([referencia], {state : this.Usuario});
  }
}