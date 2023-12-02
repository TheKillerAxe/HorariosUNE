import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Horario, Usuario, Carrera, DisponibilidadMaestro } from '../database/database';

import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imprimirhorario',
  templateUrl: './imprimirhorario.component.html',
  styleUrls: ['./imprimirhorario.component.css']
})
export class ImprimirhorarioComponent {
  Usuario: Usuario = new Usuario();
  Horario: Horario = new Horario();
  HorarioAux: Horario = new Horario();
  Disponibilidad: DisponibilidadMaestro = new DisponibilidadMaestro();

  Carreras: Carrera[] = new Array();
  Ciclos: string[] = new Array();
  Periodos: number[] = new Array();
  Docentes: Usuario[] = new Array();

  Carrera: number = -1;
  Docente: number = -1;

  habilitarIrregular: boolean = false;

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }

    this.obtenerCarreras();
    this.obtenerDocentes();
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

  obtenerCiclos() {
    (document.getElementById('periodo') as HTMLInputElement).disabled = true;
    this.Horario.Carrera = this.Carreras[this.Carrera].IdCarrera;
    this.Horario.Ciclo = "";
    this.Horario.Periodo = 0;

    this.Ciclos = new Array();
    const añoActual = new Date().getFullYear();
    this.Ciclos.push(`${añoActual}-01`);
    this.Ciclos.push(`${añoActual}-02`);

    const periodicidad = this.Carreras[this.Carrera].Periodicidad;

    if (periodicidad == "Cuatrimestral") {
      this.Ciclos.push(`${añoActual}-03`);
    }

    (document.getElementById('ciclo') as HTMLInputElement).disabled = false;
  }

  obtenerPeriodos() {
    this.Periodos = new Array();
    this.Horario.Periodo = 0;

    const ciclo = this.Horario.Ciclo;
    const periodicidad = this.Carreras[this.Carrera].Periodicidad;
    const periodos = this.Carreras[this.Carrera].CantidadPeriodos;

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

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;;
  }

  obtenerDocentes() {
    const DocenteCol = collection(this.firestore, "Usuario");
    const Query = query(DocenteCol, where("TipoUsuario", "==", "Maestro"));

    collectionData(Query).subscribe((snapDocente) => {
      for (let i = 0; i < snapDocente.length; i++) {
        this.Docentes[i] = new Usuario();
        this.Docentes[i].setData(snapDocente[i]);
      }
    });
  }

  buscarHorario() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != 0) {
      this.Horario.IdHorario = `${this.Horario.Ciclo}-${this.Horario.Carrera}-${this.Horario.Periodo}`;

      const HorarioCol = collection(this.firestore, "Horario");
      const Query = query(HorarioCol, where("IdHorario", "==", this.Horario.IdHorario));

      let flag = true;
      collectionData(Query).subscribe((snapHorarios) => {
        if (flag) {
          flag = false;

          if (snapHorarios.length > 0) {
            this.Horario.setData(snapHorarios[0]);
          }
        }
      });
    }
  }

  imprimirHorario() {
    if (this.Horario.Ciclo == '' || this.Horario.Carrera == '' || this.Horario.Periodo == 0) {
      Swal.fire('Por favor, seleccione todos los campos.', '', 'warning');
    } else {
      const DATA: any = document.getElementById('impresion');
      const DATA2: any = document.getElementById('impresionIrregular');
      const doc = new jsPDF('p', 'pt', 'letter');
      const ID = this.Horario.IdHorario;

      doc.html(DATA!, {
        html2canvas: {
          scale: .6,
        },
        x: -90,
        y: 39,
        callback: function (doc) {
          doc.save(`${ID}.pdf`);
        }
      })

      doc.html(DATA2!, {
        html2canvas: {
          scale: .6,
        },
        x: -90,
        y: 39,
        callback: function (doc) {
          doc.save(`${ID}-Irregular.pdf`);
        }
      })

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Se encontró el horario!',
        text: 'El horario puede tardar un poco en descargarse, por favor, sea paciente.',
      });
    }
  }

  buscarDisponibilidad() {
    if (this.Disponibilidad.Ciclo != "" && this.Docente > -1) {
      this.Disponibilidad.IdDisponibilidad = `${this.Docentes[this.Docente].IdUsuario}_${this.Disponibilidad.Ciclo}`;

      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol, where("IdDisponibilidad", "==", this.Disponibilidad.IdDisponibilidad));

      let flag = true;
      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (flag) {
          flag = false;

          if (snapDisponibilidad.length > 0) {
            this.Disponibilidad.setData(snapDisponibilidad[0]);
          }
        }
      });
    }
  }

  imprimirDisponibilidad() {
    if (this.Disponibilidad.Ciclo == '' || this.Docente == -1) {
      Swal.fire('Por favor, seleccione todos los campos.', '', 'warning');
    } else {
      const DATA: any = document.getElementById('impresionDocente');
      const doc = new jsPDF('p', 'pt', 'letter');
      const ID = this.Disponibilidad.IdDisponibilidad;

      doc.html(DATA!, {
        html2canvas: {
          scale: .6,
        },
        x: 15,
        y: 10,
        callback: function (doc) {
          doc.save(`${ID}.pdf`);
        }
      })

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Se encontró el horario!',
        text: 'El horario puede tardar un poco en descargarse, por favor, sea paciente.',
      });
    }
  }
}