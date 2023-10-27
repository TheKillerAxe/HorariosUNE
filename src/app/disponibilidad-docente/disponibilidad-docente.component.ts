import { Component } from '@angular/core';
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

  Ciclo: string = "";

  horas: string[] = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  habilitarDisponibilidad: boolean = false;
  nuevaDisponibilidad: boolean = true;
  cambiosRecientes: boolean = false;

  constructor(private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
  }

  advertirCambios() {
    if (this.cambiosRecientes) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Aún no ha guardado sus cambios recientes.',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Guardar Cambios',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.guardarDisponibilidad();
        }
      });
    }
  }

  cargarDisponibilidad() {
    if (this.Disponibilidad.Ciclo != "" && this.cambiosRecientes == false) {
      const DisponibilidadCol = collection(this.firestore, "Disponibilidad");
      const Query = query(DisponibilidadCol,
        where("IdMaestro", "==", `${this.Usuario.NombreUsuario}_${this.Disponibilidad.Ciclo}`),
        where("Ciclo", "==", this.Disponibilidad.Ciclo)
      );

      collectionData(Query).subscribe((snapDisponibilidad) => {
        this.Ciclo = this.Disponibilidad.Ciclo;
        if (snapDisponibilidad.length > 0) {
          this.Disponibilidad.setData(snapDisponibilidad[0]);
          this.nuevaDisponibilidad = false;
        } else {
          this.Disponibilidad = new DisponibilidadMaestro();
          this.Disponibilidad.Ciclo = this.Ciclo;
          this.nuevaDisponibilidad = true;
        }

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Disponibilidad cargada!',
          showConfirmButton: false,
          timer: 1200
        });
      });

      this.habilitarDisponibilidad = true;
    } else if (this.cambiosRecientes) {
      this.advertirCambios();
    }
  }

  guardarDisponibilidad() {
    if (this.Ciclo != "") {
      Swal.fire({
        title: 'Actualización',
        text: "¿Está seguro de estos cambios?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Disponibilidad.IdMaestro = `${this.Usuario.NombreUsuario}_${this.Ciclo}`;
          this.Disponibilidad.Nombre = this.Usuario.Nombre;

          let rutaDoc = doc(this.firestore, "Disponibilidad", this.Disponibilidad.IdMaestro);

          if (this.nuevaDisponibilidad) {
            setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Disponibilidad)));
            this.nuevaDisponibilidad = false;
          } else {
            let data = {
              IdMaestro: this.Disponibilidad.IdMaestro,
              Nombre: this.Disponibilidad.Nombre,
              Ciclo: this.Ciclo,
              Disponibilidad: this.Disponibilidad.Disponibilidad
            };
            updateDoc(rutaDoc, data);
          }

          this.cambiosRecientes = false;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cambios guardados!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
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
          this.cambiosRecientes = true;
        }
      });
    } else {
      this.Disponibilidad.Disponibilidad[i].registro[j].hora = this.horas[j];
      this.Disponibilidad.Disponibilidad[i].registro[j].disponible = true;
      const celda = document.getElementById(`c${i}${j}`);
      if (celda) {
        celda.classList.add('dato-agregado');
      }
      this.cambiosRecientes = true;

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Hora Seleccionada:',
        text: this.Disponibilidad.Disponibilidad[i].registro[j].hora + ' hrs',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }
}
