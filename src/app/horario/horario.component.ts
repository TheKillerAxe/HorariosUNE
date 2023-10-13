import { Component } from '@angular/core';
import { Usuario, Horario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { getDownloadURL, getStorage, deleteObject } from 'firebase/storage';

import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {
  Usuario: Usuario = new Usuario();
  Horario: Horario = new Horario();

  maestroSeleccionado = "";
  materiaSeleccionada = "";

  mostrarHorarioIrregular: boolean = false;
  errorGuardar: boolean = false;
  nuevoHorario: boolean = false;

  constructor(private firestore: Firestore, private fireStorage: Storage) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
  }

  existeHorario() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = false;
      (document.getElementById('disabledSelect3') as HTMLInputElement).disabled = false;

      this.Horario.IdHorario = `${this.Horario.Ciclo}-${this.Horario.Carrera}-${this.Horario.Periodo}`;

      const Horario = collection(this.firestore, "Horario");
      const Query = query(Horario, where("IdHorario", "==", this.Horario.IdHorario));

      collectionData(Query).subscribe((snapHorarios) => {
        if (snapHorarios.length > 0) {
          this.Horario.setData(snapHorarios[0]);
        } else {
          this.nuevoHorario = true;
        }
      });
    }
  }

  openSwalModalR(i: number, j: number) {
    const materiaSeleccionada = this.materiaSeleccionada;
    const maestroSeleccionado = this.maestroSeleccionado;

    Swal.fire({
      title: 'Ingresa el salón',
      html:
        `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
      focusConfirm: false,
      preConfirm: () => {
        const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
        return { valor3 };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { valor3 } = result.value;
        this.Horario.HorarioRegular[i].registro[j].salon = materiaSeleccionada;
        this.Horario.HorarioRegular[i].registro[j].maestro = maestroSeleccionado;
        this.Horario.HorarioRegular[i].registro[j].texto = valor3;

        const cell = document.getElementById(`c${i}${j}`);
        if (cell) {
          cell.classList.add('dato-agregado');
          this.Horario.Maestros.unshift(maestroSeleccionado);
          this.Horario.Materias.unshift(materiaSeleccionada);
        }
      }
    });
  }

  openSwalModalI(i: number, j: number) {
    const materiaSeleccionada = this.materiaSeleccionada;
    const maestroSeleccionado = this.maestroSeleccionado;

    Swal.fire({
      title: 'Ingresa el salón',
      html:
        `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
      focusConfirm: false,
      preConfirm: () => {
        const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
        return { valor3 };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { valor3 } = result.value;
        this.Horario.HorarioIrregular[i].registro[j].salon = materiaSeleccionada;
        this.Horario.HorarioIrregular[i].registro[j].maestro = maestroSeleccionado;
        this.Horario.HorarioIrregular[i].registro[j].texto = valor3;

        const cell = document.getElementById(`c${i}${j}`);
        if (cell) {
          cell.classList.add('dato-agregado');
          this.Horario.Maestros.unshift(maestroSeleccionado);
          this.Horario.Materias.unshift(materiaSeleccionada);
        }
      }
    });
  }

  eliminarDuplicados<T>(array: T[]) {
    const result: T[] = [];
    for (const item of array) {
      if (!result.includes(item)) {
        result.push(item);
      }
    }
    return result;
  }

  guardarHorario() {
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
        this.Horario.Maestros = this.eliminarDuplicados(this.Horario.Maestros);
        this.Horario.Materias = this.eliminarDuplicados(this.Horario.Materias);

        let rutaDoc = doc(this.firestore, "Horario", this.Horario.IdHorario);

        if (this.nuevoHorario) {
          setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Horario)));
          this.nuevoHorario = false;
        } else {
          let data = {
            IdHorario: this.Horario.IdHorario,
            Periodo: this.Horario.Periodo,
            Carrera: this.Horario.Carrera,
            Ciclo: this.Horario.Ciclo,
            UltimaModificacion: this.Horario.UltimaModificacion,
            Materias: this.Horario.Materias,
            Maestros: this.Horario.Maestros,
            HorarioRegular: this.Horario.HorarioRegular,
            HorarioIrregular: this.Horario.HorarioIrregular
          };
          updateDoc(rutaDoc, data);
        }

        this.generarPDF();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El horario se guardó de forma exitosa!',
          showConfirmButton: false,
          timer: 1200
        });
      }
    });
  }

  generarPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15; const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      let ruta = this.Horario.IdHorario;
      const storageRef = ref(this.fireStorage, ruta);

      uploadBytesResumable(storageRef, docResult.output('blob'));
    });
  }

  mostrarCodigoHorario() {
    this.mostrarHorarioIrregular = !this.mostrarHorarioIrregular;
  }
}