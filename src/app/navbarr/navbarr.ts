import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/database/database';
import { Input } from '@angular/core';

@Component({
  selector: 'navbarr',
  templateUrl: './navbarr.html',
  styleUrls: ['./navbarr.css']
})
export class navbarComponent {
  @Input() Usuario = new Usuario();

  constructor(public router : Router, private fireStorage:Storage) { }

  navegar(referencia : string) {
    this.router.navigate([referencia], {state : this.Usuario});
  }
}