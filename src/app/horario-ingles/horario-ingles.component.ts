import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario-ingles',
  templateUrl: './horario-ingles.component.html',
  styleUrls: ['./horario-ingles.component.css']
})
export class HorarioInglesComponent {
  Usuario : Usuario = new Usuario();

  horario: any[] = new Array()
  maestro = "";
  ciclo = "";
  periodo = "";
  periodicidad = "";

  constructor(public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Ingles") {
      this.router.navigate(['']);
    }

    this.horario[0] = [{}]
    this.horario[1] = [{}]
    this.horario[2] = [{}]
    this.horario[3] = [{}]
    this.horario[4] = [{}]
    this.horario[5] = [{}]
    this.horario[6] = [{}]

    this.horario[0][0] = { texto: "7:00" }
    this.horario[0][1] = { texto: "8:00" }
    this.horario[0][2] = { texto: "9:00" }
    this.horario[0][3] = { texto: "10:00" }
    this.horario[0][4] = { texto: "11:00" }
    this.horario[0][5] = { texto: "12:00" }
    this.horario[0][6] = { texto: "13:00" }
    this.horario[0][7] = { texto: "14:00" }
    this.horario[0][8] = { texto: "15:00" }
    this.horario[0][9] = { texto: "16:00" }
    this.horario[0][10] = { texto: "17:00" }
    this.horario[0][11] = { texto: "18:00" }
    this.horario[0][12] = { texto: "19:00" }
    this.horario[0][13] = { texto: "20:00" }
    this.horario[0][14] = { texto: "21:00" }
    this.horario[0][15] = { texto: "22:00" }

    this.horario[1][0] = { texto: "" }
    this.horario[1][1] = { texto: "" }
    this.horario[1][2] = { texto: "" }
    this.horario[1][3] = { texto: "" }
    this.horario[1][4] = { texto: "" }
    this.horario[1][5] = { texto: "" }
    this.horario[1][6] = { texto: "" }
    this.horario[1][7] = { texto: "" }
    this.horario[1][8] = { texto: "" }
    this.horario[1][9] = { texto: "" }
    this.horario[1][10] = { texto: "" }
    this.horario[1][11] = { texto: "" }
    this.horario[1][12] = { texto: "" }
    this.horario[1][13] = { texto: "" }
    this.horario[1][14] = { texto: "" }
    this.horario[1][15] = { texto: "" }

    this.horario[2][0] = { texto: "" }
    this.horario[2][1] = { texto: "" }
    this.horario[2][2] = { texto: "" }
    this.horario[2][3] = { texto: "" }
    this.horario[2][4] = { texto: "" }
    this.horario[2][5] = { texto: "" }
    this.horario[2][6] = { texto: "" }
    this.horario[2][7] = { texto: "" }
    this.horario[2][8] = { texto: "" }
    this.horario[2][9] = { texto: "" }
    this.horario[2][10] = { texto: "" }
    this.horario[2][11] = { texto: "" }
    this.horario[2][12] = { texto: "" }
    this.horario[2][13] = { texto: "" }
    this.horario[2][14] = { texto: "" }
    this.horario[2][15] = { texto: "" }

    this.horario[3][0] = { texto: "" }
    this.horario[3][1] = { texto: "" }
    this.horario[3][2] = { texto: "" }
    this.horario[3][3] = { texto: "" }
    this.horario[3][4] = { texto: "" }
    this.horario[3][5] = { texto: "" }
    this.horario[3][6] = { texto: "" }
    this.horario[3][7] = { texto: "" }
    this.horario[3][8] = { texto: "" }
    this.horario[3][9] = { texto: "" }
    this.horario[3][10] = { texto: "" }
    this.horario[3][11] = { texto: "" }
    this.horario[3][12] = { texto: "" }
    this.horario[3][13] = { texto: "" }
    this.horario[3][14] = { texto: "" }
    this.horario[3][15] = { texto: "" }

    this.horario[4][0] = { texto: "" }
    this.horario[4][1] = { texto: "" }
    this.horario[4][2] = { texto: "" }
    this.horario[4][3] = { texto: "" }
    this.horario[4][4] = { texto: "" }
    this.horario[4][5] = { texto: "" }
    this.horario[4][6] = { texto: "" }
    this.horario[4][7] = { texto: "" }
    this.horario[4][8] = { texto: "" }
    this.horario[4][9] = { texto: "" }
    this.horario[4][10] = { texto: "" }
    this.horario[4][11] = { texto: "" }
    this.horario[4][12] = { texto: "" }
    this.horario[4][13] = { texto: "" }
    this.horario[4][14] = { texto: "" }
    this.horario[4][15] = { texto: "" }

    this.horario[5][0] = { texto: "" }
    this.horario[5][1] = { texto: "" }
    this.horario[5][2] = { texto: "" }
    this.horario[5][3] = { texto: "" }
    this.horario[5][4] = { texto: "" }
    this.horario[5][5] = { texto: "" }
    this.horario[5][6] = { texto: "" }
    this.horario[5][7] = { texto: "" }
    this.horario[5][8] = { texto: "" }
    this.horario[5][9] = { texto: "" }
    this.horario[5][10] = { texto: "" }
    this.horario[5][11] = { texto: "" }
    this.horario[5][12] = { texto: "" }
    this.horario[5][13] = { texto: "" }
    this.horario[5][14] = { texto: "" }
    this.horario[5][15] = { texto: "" }

    this.horario[6][0] = { texto: "" }
    this.horario[6][1] = { texto: "" }
    this.horario[6][2] = { texto: "" }
    this.horario[6][3] = { texto: "" }
    this.horario[6][4] = { texto: "" }
    this.horario[6][5] = { texto: "" }
    this.horario[6][6] = { texto: "" }
    this.horario[6][7] = { texto: "" }
    this.horario[6][8] = { texto: "" }
    this.horario[6][9] = { texto: "" }
    this.horario[6][10] = { texto: "" }
    this.horario[6][11] = { texto: "" }
    this.horario[6][12] = { texto: "" }
    this.horario[6][13] = { texto: "" }
    this.horario[6][14] = { texto: "" }
    this.horario[6][15] = { texto: "" }
  }

  openSwalModal(i: number, j: number) {
    if (this.periodo === '' || this.ciclo === '' || this.periodicidad === '') {
      Swal.fire('Por favor seleccione todos los campos antes de seleccionar el horario.', '', 'warning');
      return;
    }

    const celda = this.horario[i][j];
    const celdaElement = document.getElementById(`c${i}${j}`); // Definir la variable celdaElement

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
          if (celdaElement) {
            celdaElement.classList.remove('dato-agregado');
          }
        }
      });
    } else {
      celda.periodicidad = this.periodicidad;
      celda.periodo = this.periodo + ' Periodo';
      if (celdaElement) {
        celdaElement.classList.add('dato-agregado');
      }
    }
  }

  cambiosguardados() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 1500
    })
  }
}