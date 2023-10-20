import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from 'src/database/database';

@Component({
  selector: 'altamaestrosPrueba',
  templateUrl: './altamaestrosPrueba.html',
  styleUrls: ['./altamaestrosPrueba.css'],
})
export class altamaestrosPrueba {
  
  Usuario: Usuario = new Usuario();

  constructor( private firestore: Firestore, public router: Router,  private fireStorage: Storage) {
    
  }

}
