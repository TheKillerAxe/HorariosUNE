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

  habilitarDisponibilidad: boolean = false;

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Maestro") {
      this.router.navigate(['']);
    }
  }

  cargarDisponibilidad() {
    if (this.Disponibilidad.Ciclo != "") {
      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol,
        where("IdDisponibilidad", "==", `${this.Usuario.NombreUsuario}_${this.Disponibilidad.Ciclo}`),
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
  
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Disponibilidad cargada!',
            showConfirmButton: false,
            timer: 1200
          });
        }
      });

      this.habilitarDisponibilidad = true;
    } else {
      Swal.fire('Debe seleccionar un ciclo antes de cargar la disponibilidad.', '', 'error');
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
          this.Disponibilidad.IdDisponibilidad = `${this.Usuario.NombreUsuario}_${this.Disponibilidad.Ciclo}`;
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
      Swal.fire('Por favor, seleccione un ciclo y cargue la disponibilidad antes de comenzar.', '', 'warning');
    }
  }

  openSwalModal(i: number, j: number) {
    if (this.habilitarDisponibilidad == false) {
      Swal.fire('Por favor, seleccione un ciclo y cargue la disponibilidad antes de comenzar.', '', 'warning');
      return;
    }

    if (this.Disponibilidad.Disponibilidad[i].registro[j].hora) {
      Swal.fire({
        title: 'Eliminar hora',
        text: '¿Deseas eliminar la hora seleccionada?',
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
