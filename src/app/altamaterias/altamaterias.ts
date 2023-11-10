import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario, Carrera, Materia } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';
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
  Materia: Materia = new Materia();

  Carreras: Carrera[] = new Array();
  Periodos: number[] = new Array();

  Carrera: number = -1;

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }

    this.obtenerCarreras();
  }

  obtenerCarreras() {
    const CarreraCol = collection(this.firestore, "Carrera");
    const Query = query(CarreraCol);

    collectionData(Query).subscribe((snapCarreras) => {
      for (let i = 0; i < snapCarreras.length; i++) {
        this.Carreras[i] = new Carrera();
        this.Carreras[i].setData(snapCarreras[i]);
      }
    });
  }

  obtenerPeriodos() {
    this.Materia.Carrera = this.Carreras[this.Carrera].Nombre;
    this.Periodos = new Array();

    for (let i = 0; i < this.Carreras[this.Carrera].CantidadPeriodos; i++) {
      this.Periodos[i] = i + 1;
    }

    (document.getElementById('Periodo') as HTMLInputElement).disabled = false;
  }

  inicialesCarrera(): string {
    const carrera = this.Materia.Carrera;
    let checkpoint = 0;
    let iniciales = carrera.substring(0, 1);

    for (let i = 0; i < carrera.length; i++) {
      if (carrera.charAt(i) == ' ' || i == carrera.length - 1) {
        if (checkpoint != 0) {
          let palabra = carrera.substring(checkpoint, i);
          if (palabra != "y" && palabra != "en" && palabra != "de") {
            iniciales += palabra.substring(0, 1);
          }
        }
        checkpoint = i + 1;
      }
    }

    return iniciales;
  }

  inicialesMateria(): string {
    const materia = this.Materia.Nombre;
    let checkpoint = 0;
    let iniciales = materia.substring(0, 1);

    for (let i = 0; i < materia.length; i++) {
      if (materia.charAt(i) == ' ' || i == materia.length - 1) {
        if (checkpoint != 0) {
          let palabra = materia.substring(checkpoint, i);
          if (palabra != "y" && palabra != "en" && palabra != "de") {
            iniciales += palabra.substring(0, 1);
          }
        }
        checkpoint = i + 1;
      }
    }

    return iniciales;
  }

  agregarMateria() {
    if (this.Materia.Nombre != "" && this.Materia.Carrera != "" && this.Materia.Periodo != "" && this.Materia.Horas > 0) {
      this.Materia.IdMateria = `${this.inicialesCarrera()}-${this.inicialesMateria()}`;

      let rutaDoc = doc(this.firestore, "Materia", this.Materia.IdMateria);

      setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Materia))).then(() => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Tus datos se guardaron correctamente!',
          showConfirmButton: false,
          timer: 1200
        });

        this.Materia = new Materia();
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Favor de llenar todos los campos.',
        showConfirmButton: true
      });
    }
  }
}

