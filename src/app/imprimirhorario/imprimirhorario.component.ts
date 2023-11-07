import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-imprimirhorario',
  templateUrl: './imprimirhorario.component.html',
  styleUrls: ['./imprimirhorario.component.css']
})
export class ImprimirhorarioComponent implements OnInit {

  horario: any[] = new Array();
  carrera = '';
  ciclo = '';
  periodo = '';
  docente = '';
  horas: string[] = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  maestro='';
  texto='';
  salon='';

  constructor() {
    for (let i = 0; i < 7; i++) {
      this.horario[i] = [{}];
      for (let j = 0; j < 16; j++) {
        this.horario[i][j] = { texto: this.horas[j] };
      }
    }

  
  }

  ngOnInit(): void {
  }


  imprimir() {
    if (this.ciclo === '' || this.carrera === '' || this.periodo === '') {
      Swal.fire('Por favor seleccione todos los campos.', '', 'warning');
      return;
    } else {
      const DATA: any = document.getElementById('impresion');
      const doc = new jsPDF('p', 'pt', 'letter');
      

      doc.html(DATA!, {
        html2canvas: {
          scale: .6,
        },
        x: -90,
        y: 39,
        callback: function(doc) {
          doc.save('Horario.pdf');
        }
      })
    }
  }

  imprimirdocente() {
    if (this.docente === '') {
      Swal.fire('Por favor seleccione todos los campos.', '', 'warning');
      return;
    }else {
      const DATA: any = document.getElementById('impresion');
      const doc = new jsPDF('p', 'pt', 'letter');
      

      doc.html(DATA!, {
        html2canvas: {
          scale: .5,
        },
        x: -33,
        y: 30,
        callback: function(doc) {
          doc.save('Horario Docente.pdf');
        }
      })
    }
  }

}
