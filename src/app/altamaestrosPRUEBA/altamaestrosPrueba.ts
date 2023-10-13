import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/database/database';
import readXlsxFile from 'read-excel-file';
import { Firestore } from '@angular/fire/firestore';
import { DocumentData, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';

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
