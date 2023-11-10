import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import Swal from 'sweetalert2';
import readXlsxFile from 'read-excel-file';


@Component({
  selector: 'altamaterias',
  templateUrl: './altamaterias.html',
  styleUrls: ['./altamaterias.css']
})
export class AltamateriasComponent {
    Usuario: Usuario = new Usuario();


}

