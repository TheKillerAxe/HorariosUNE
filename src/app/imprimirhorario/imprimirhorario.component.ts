import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Horario, Usuario } from '../database/database';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imprimirhorario',
  templateUrl: './imprimirhorario.component.html',
  styleUrls: ['./imprimirhorario.component.css']
})
export class ImprimirhorarioComponent {
  Usuario: Usuario = new Usuario();
  Horario: Horario = new Horario();

  Docente: string = "";

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }
  }

  imprimirHorario() {
    if (this.Horario.Ciclo == '' || this.Horario.Carrera == '' || this.Horario.Periodo == '') {
      Swal.fire('Por favor, seleccione todos los campos.', '', 'warning');
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
        callback: function (doc) {
          doc.save('Horario.pdf');
        }
      })
    }
  }

  buscarHorario() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      this.Horario.IdHorario = `${this.Horario.Ciclo}-${this.Horario.Carrera}-${this.Horario.Periodo}`;

      const HorarioCol = collection(this.firestore, "Horario");
      const Query = query(HorarioCol, where("IdHorario", "==", this.Horario.IdHorario));

      collectionData(Query).subscribe((snapHorarios) => {
        if (snapHorarios.length > 0) {
          this.Horario.setData(snapHorarios[0]);
          this.imprimirHorario();
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Este horario no existe.',
            showConfirmButton: false,
            timer: 1200
          });
        }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Favor de llenar los campos de Ciclo, Carrera y Periodo.',
        showConfirmButton: true
      });
    }
  }

  buscarDocente() {

  }

  imprimirDocente() {
    if (this.Docente === '') {
      Swal.fire('Por favor seleccione todos los campos.', '', 'warning');
      return;
    } else {
      const DATA: any = document.getElementById('impresion');
      const doc = new jsPDF('p', 'pt', 'letter');

      doc.html(DATA!, {
        html2canvas: {
          scale: .5,
        },
        x: -33,
        y: 30,
        callback: function (doc) {
          doc.save('Horario Docente.pdf');
        }
      })
    }
  }
}
