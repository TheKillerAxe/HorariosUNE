
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css']
})
export class DisponibilidadComponent implements OnInit {

  horario: any[] = new Array();
  maestro = '';
  ciclo = '';
  periodo = '';
  periodicidad = '';
  diaHora: string = '';
  horas: string[] = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  celdaSeleccionada: { i: number, j: number } | null = null;

  constructor() {
    for (let i = 0; i < 7; i++) {
      this.horario[i] = [{}];
      for (let j = 0; j < 16; j++) {
        this.horario[i][j] = { texto: this.horas[j]};
      }
    }
  }

  ngOnInit(): void {
  }

  cambiosguardados() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 1500
    });
  }
  
 

  openSwalModal(i: number, j: number) {
    if (this.ciclo === '' || this.ciclo === null) {
      Swal.fire('Por favor seleccione un ciclo antes de seleccionar el horario.', '', 'warning');
      return;
    }
  
    if (this.horario[i][j].hora) {
      Swal.fire({
        title: 'Eliminar hora',
        text: '¿Deseas eliminar la hora seleccionada?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.horario[i][j].hora = '';
          const celda = document.getElementById(`c${i}${j}`);
          if (celda) {
            celda.classList.remove('dato-agregado');
          }
        }
      });
    } else {
      this.horario[i][j].hora = this.horas[j];
      const celda = document.getElementById(`c${i}${j}`);
      if (celda) {
        celda.classList.add('dato-agregado');
      }
      Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Hora Seleccionada:',
      text:this.horario[i][j].hora + ' hrs',
      showConfirmButton: false,
      timer: 1000
      });
    }
  }
  
}
