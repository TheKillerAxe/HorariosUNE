import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { DisponibilidadIngles, Horario, Usuario } from '../database/database';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario-ingles',
  templateUrl: './horario-ingles.component.html',
  styleUrls: ['./horario-ingles.component.css']
})
export class HorarioInglesComponent {
  Usuario: Usuario = new Usuario();
  Horario: Horario = new Horario();
  Disponibilidad: DisponibilidadIngles = new DisponibilidadIngles();

  Ciclos: string[] = new Array();
  Periodos: number[] = new Array();

  constructor(private firestore: Firestore, public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }
  }

  obtenerCiclos() {
    (document.getElementById('periodo') as HTMLInputElement).disabled = true;
    this.Periodos = new Array();
    this.Disponibilidad.Periodo = "";

    this.Ciclos = new Array();
    const añoActual = new Date().getFullYear();

    this.Ciclos.push(`${añoActual}-01`);
    this.Ciclos.push(`${añoActual}-02`);

    if (this.Disponibilidad.Periodicidad == "Cuatrimestral") {
      this.Ciclos.push(`${añoActual}-03`);
    }

    (document.getElementById('ciclo') as HTMLInputElement).disabled = false;
  }

  obtenerPeriodos() {
    this.Periodos = new Array();
    const ciclo = this.Disponibilidad.Ciclo;
    const periodicidad = this.Disponibilidad.Periodicidad;
    const periodos = 9;

    try {
      switch (ciclo) {
        case this.Ciclos[0]:
          switch (periodicidad) {
            case "Semestral":
              for (let i = 2; i <= periodos; i = i + 2) {
                this.Periodos.push(i);
              }
              break;
            case "Cuatrimestral":
              for (let i = 2; i <= periodos; i = i + 3) {
                this.Periodos.push(i);
              }
              break;
          }
          break;
        case this.Ciclos[1]:
          switch (periodicidad) {
            case "Semestral":
              for (let i = 1; i <= periodos; i = i + 2) {
                this.Periodos.push(i);
              }
              break;
            case "Cuatrimestral":
              for (let i = 3; i <= periodos; i = i + 3) {
                this.Periodos.push(i);
              }
              break;
          }
          break;
        case this.Ciclos[2]:
          for (let i = 1; i <= periodos; i = i + 3) {
            this.Periodos.push(i);
          }
          break;
      }
    } catch {}

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  openSwalModal(i: number, j: number) {
    if (this.Disponibilidad.Periodo == '' || this.Disponibilidad.Ciclo == '' || this.Disponibilidad.Periodicidad == '') {
      Swal.fire('Por favor seleccione todos los campos antes de seleccionar el horario.', '', 'warning');
      return;
    }

    const celda = this.Disponibilidad.Disponibilidad[i].registro[j];
    const celdaElement = document.getElementById(`c${i}${j}`);

    if (celda.periodo && celda.periodicidad) {
      Swal.fire({
        title: 'Eliminar selección',
        text: '¿Deseas eliminar la selección?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          celda.periodicidad = '';
          celda.periodo = '';
          celda.disponible = false;
          if (celdaElement) {
            celdaElement.classList.remove('dato-agregado');
          }
        }
      });
    } else {
      celda.periodicidad = this.Disponibilidad.Periodicidad;
      celda.periodo = this.Disponibilidad.Periodo + '° Periodo';
      celda.disponible = true;
      if (celdaElement) {
        celdaElement.classList.add('dato-agregado');
      }
    }

    this.Disponibilidad.Disponibilidad[i].registro[j] = celda;
  }

  cambiosguardados() {
    this.Disponibilidad.IdDisponibilidad = `${this.Disponibilidad.Periodicidad}_${this.Disponibilidad.Ciclo}_${this.Disponibilidad.Periodo}`;
    let rutaDoc = doc(this.firestore, "DisponibilidadIngles", this.Disponibilidad.IdDisponibilidad);

    setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Disponibilidad))).then(() => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Tus datos se guardaron correctamente!',
        showConfirmButton: false,
        timer: 1200
      });
    });
  }

  cargarDisponibilidad() {
    if (this.Disponibilidad.Periodicidad != "" && this.Disponibilidad.Ciclo != "" && this.Disponibilidad.Periodo != "") {
      const DisponibilidadCol = collection(this.firestore, "DisponibilidadIngles");
      const Query = query(DisponibilidadCol, where("IdDisponibilidad", "==", `${this.Disponibilidad.Periodicidad}_${this.Disponibilidad.Ciclo}_${this.Disponibilidad.Periodo}`));

      let flag = true;
      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (flag) {
          flag = false;

          if (snapDisponibilidad.length > 0) {
            this.Disponibilidad.setData(snapDisponibilidad[0]);
          } else {
            let periodicidad = this.Disponibilidad.Periodicidad;
            let ciclo = this.Disponibilidad.Ciclo;
            let periodo = this.Disponibilidad.Periodo;
            this.Disponibilidad = new DisponibilidadIngles();
            this.Disponibilidad.Periodicidad = periodicidad;
            this.Disponibilidad.Ciclo = ciclo;
            this.Disponibilidad.Periodo = periodo;
          }
        }
      });
    }
  }
}