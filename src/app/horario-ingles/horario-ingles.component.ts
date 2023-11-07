import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DisponibilidadIngles, Horario, Usuario } from '../database/database';

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

  maestro = "";

  constructor(public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Ingles") {
      this.router.navigate(['']);
    }
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
          if (celdaElement) {
            celdaElement.classList.remove('dato-agregado');
          }
        }
      });
    } else {
      celda.periodicidad = this.Disponibilidad.Periodicidad;
      celda.periodo = this.Disponibilidad.Periodo + '° Periodo';
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