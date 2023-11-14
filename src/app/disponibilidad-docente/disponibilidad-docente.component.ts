import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { DisponibilidadMaestro, Usuario } from '../database/database';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-disponibilidad-docente',
  templateUrl: './disponibilidad-docente.component.html',
  styleUrls: ['./disponibilidad-docente.component.css']
})
export class DisponibilidadDocenteComponent {
  Usuario: Usuario = new Usuario();
  Disponibilidad: DisponibilidadMaestro = new DisponibilidadMaestro();
  DisponibilidadAux: DisponibilidadMaestro = new DisponibilidadMaestro();

  Ciclos: string[] = new Array();

  habilitarDisponibilidad: boolean = false;

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Maestro") {
      this.router.navigate(['']);
    }

    this.obtenerCiclos();
  }

  obtenerCiclos() {
    const añoActual = new Date().getFullYear();

    this.Ciclos.push(`${añoActual}-01`);
    this.Ciclos.push(`${añoActual}-02`);
    this.Ciclos.push(`${añoActual}-03`);
  }

  cargarDisponibilidad() {
    if (this.Disponibilidad.Ciclo != "") {
      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol,
        where("IdDisponibilidad", "==", `${this.Usuario.IdUsuario}_${this.Disponibilidad.Ciclo}`),
        where("Ciclo", "==", this.Disponibilidad.Ciclo)
      );
      
      let flag = true;
      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (flag) {
          flag = false;

          if (snapDisponibilidad.length > 0) {
            this.Disponibilidad.setData(snapDisponibilidad[0]);
          } else {
            let ciclo = this.Disponibilidad.Ciclo;
            this.Disponibilidad = new DisponibilidadMaestro();
            this.Disponibilidad.Ciclo = ciclo;
          }
        }
      });

      this.habilitarDisponibilidad = true;

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Disponibilidad Cargada',
        text: 'Puede comenzar a editar su disponibilidad.',
        showConfirmButton: false,
        timer: 1200
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Seleccione un ciclo para cargar la disponibilidad.'
      });
    }
  }

  guardarDisponibilidad() {
    if (this.habilitarDisponibilidad) {
      Swal.fire({
        title: 'Guardar Cambios',
        text: "¿Está seguro de estos cambios?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Disponibilidad.IdDisponibilidad = `${this.Usuario.IdUsuario}_${this.Disponibilidad.Ciclo}`;
          this.Disponibilidad.Nombre = this.Usuario.Nombre;

          let rutaDoc = doc(this.firestore, "DisponibilidadMaestro", this.Disponibilidad.IdDisponibilidad);
          setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Disponibilidad)));

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios guardados!',
            showConfirmButton: false,
            timer: 1200
          });
        }
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Por favor, seleccione un ciclo y cargue la disponibilidad antes de comenzar.'
      });
    }
  }

  openSwalModal(i: number, j: number) {
    if (this.habilitarDisponibilidad == false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Por favor, seleccione un ciclo y cargue la disponibilidad antes de comenzar.'
      });
      return;
    }

    if (this.Disponibilidad.Disponibilidad[i].registro[j].hora) {
      Swal.fire({
        title: 'Eliminar Hora',
        text: '¿Desea eliminar la hora seleccionada?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.Disponibilidad.Disponibilidad[i].registro[j].hora = '';
          this.Disponibilidad.Disponibilidad[i].registro[j].disponible = false;
          const celda = document.getElementById(`c${i}${j}`);
          if (celda) {
            celda.classList.remove('dato-agregado');
          }
        }
      });
    } else {
      this.Disponibilidad.Disponibilidad[i].registro[j].hora = this.Disponibilidad.Disponibilidad[0].registro[j].texto;
      this.Disponibilidad.Disponibilidad[i].registro[j].disponible = true;
      const celda = document.getElementById(`c${i}${j}`);
      if (celda) {
        celda.classList.add('dato-agregado');
      }
    }
  }
}
