import { Component } from '@angular/core';
import { Usuario, Horario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {
  Usuario: Usuario = new Usuario();
  Horario: Horario = new Horario();

  materiasOriginales: string[] = ["Seminario de tecnologias", "Algebra", "Costos"];
  materiasDuplicadas: string[] = this.materiasOriginales;

  maestroSeleccionado = "";
  materiaSeleccionada = "";

  mostrarHorarioIrregular: boolean = false;
  nuevoHorario: boolean = true;
  horarioHabilitado: boolean = false;

  constructor(private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
  }

  vaciarHorario() {
    let _id = this.Horario.IdHorario;
    let _ciclo = this.Horario.Ciclo;
    let _carrera = this.Horario.Carrera;
    let _periodo = this.Horario.Periodo;

    this.Horario = new Horario();

    this.Horario.IdHorario = _id;
    this.Horario.Ciclo = _ciclo;
    this.Horario.Carrera = _carrera;
    this.Horario.Periodo = _periodo;
  }

  buscarHorario() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      this.Horario.IdHorario = `${this.Horario.Ciclo}-${this.Horario.Carrera}-${this.Horario.Periodo}`;

      const HorarioCol = collection(this.firestore, "Horario");
      const Query = query(HorarioCol, where("IdHorario", "==", this.Horario.IdHorario));

      collectionData(Query).subscribe((snapHorarios) => {
        if (snapHorarios.length > 0) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Se encontró el horario!',
            showConfirmButton: false,
            timer: 1200
          });

          this.Horario.setData(snapHorarios[0]);
          this.nuevoHorario = false;
        } else {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Este horario aún no existe.',
            text: '¿Desea iniciar un nuevo horario?',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.vaciarHorario();
              this.nuevoHorario = true;
            }
          });
        }

        (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = false;
        (document.getElementById('disabledSelect3') as HTMLInputElement).disabled = false;
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

  habilitarHorario() {
    if (this.maestroSeleccionado != "" && this.materiaSeleccionada != "") {
      this.horarioHabilitado = true;
    } else {
      this.horarioHabilitado = false;
    }
  }

  openSwalModalR(i: number, j: number) {
    if (this.horarioHabilitado) {
      const materiaSeleccionada = this.materiaSeleccionada;
      const maestroSeleccionado = this.maestroSeleccionado;

      Swal.fire({
        title: 'Ingresa el salón',
        html:
          `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
        focusConfirm: false,
        showDenyButton: true,
        denyButtonText: 'Borrar',
        preConfirm: () => {
          const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
          return { valor3 };
        },
      }).then((result) => {
        const { valor3 } = result.value;

        if (result.isConfirmed) {
          this.Horario.HorarioRegular[i].registro[j].salon = "Salón: " + valor3;;
          this.Horario.HorarioRegular[i].registro[j].maestro = maestroSeleccionado;
          this.Horario.HorarioRegular[i].registro[j].texto = materiaSeleccionada;

          const cell = document.getElementById(`c${i}${j}`);
          if (cell) {
            cell.classList.add('dato-agregado');
            this.Horario.Maestros.unshift(maestroSeleccionado);
            this.Horario.Materias.unshift(materiaSeleccionada);
          }
        }
        if (result.isDenied) {
          this.Horario.HorarioRegular[i].registro[j].salon = "";
          this.Horario.HorarioRegular[i].registro[j].maestro = "";
          this.Horario.HorarioRegular[i].registro[j].texto = "";

          const cell = document.getElementById(`c${i}${j}`);
          if (cell) {
            cell.classList.add('dato-agregado');
          }
        }
      });
    } else if (this.Horario.HorarioRegular[i].registro[j].texto != "") {
      Swal.fire({
        title: '¿Borrar este registro?',
        focusConfirm: false,
        showDenyButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Horario.HorarioRegular[i].registro[j].salon = "";
          this.Horario.HorarioRegular[i].registro[j].maestro = "";
          this.Horario.HorarioRegular[i].registro[j].texto = "";
        }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Favor de llenar todos los campos.',
        showConfirmButton: true
      });
    }
  }

  openSwalModalI(i: number, j: number) {
    if (this.horarioHabilitado) {
      const materiaSeleccionada = this.materiaSeleccionada;
      const maestroSeleccionado = this.maestroSeleccionado;

      Swal.fire({
        title: 'Ingresa el salón',
        html:
          `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
        focusConfirm: false,
        showDenyButton: true,
        denyButtonText: 'Borrar',
        preConfirm: () => {
          const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
          return { valor3 };
        },
      }).then((result) => {
        const { valor3 } = result.value;

        if (result.isConfirmed) {
          this.Horario.HorarioIrregular[i].registro[j].salon = "Salón: " + valor3;;
          this.Horario.HorarioIrregular[i].registro[j].maestro = maestroSeleccionado;
          this.Horario.HorarioIrregular[i].registro[j].texto = materiaSeleccionada;

          const cell = document.getElementById(`c${i}${j}`);
          if (cell) {
            cell.classList.add('dato-agregado');
            this.Horario.Maestros.unshift(maestroSeleccionado);
            this.Horario.Materias.unshift(materiaSeleccionada);
          }
        }
        if (result.isDenied) {
          this.Horario.HorarioIrregular[i].registro[j].salon = "";
          this.Horario.HorarioIrregular[i].registro[j].maestro = "";
          this.Horario.HorarioIrregular[i].registro[j].texto = "";

          const cell = document.getElementById(`c${i}${j}`);
          if (cell) {
            cell.classList.add('dato-agregado');
          }
        }
      });
    } else if (this.Horario.HorarioIrregular[i].registro[j].texto != "") {
      Swal.fire({
        title: '¿Borrar este registro?',
        focusConfirm: false,
        showDenyButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Horario.HorarioIrregular[i].registro[j].salon = "";
          this.Horario.HorarioIrregular[i].registro[j].maestro = "";
          this.Horario.HorarioIrregular[i].registro[j].texto = "";
        }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Favor de llenar todos los campos.',
        showConfirmButton: true
      });
    }
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

  toggleIrregular() {
    this.mostrarHorarioIrregular = !this.mostrarHorarioIrregular;
  }

  duplicarmaterias() {
    Swal.fire({
      icon: 'success',
      title: 'Materias divididas correctamente',
      showConfirmButton: false,
      timer: 1200
    });

    const materiasDuplicadasTemp: string[] = [];
    for (const materia of this.materiasOriginales) {
      materiasDuplicadasTemp.push(`${materia} (Grupo A)`);
      materiasDuplicadasTemp.push(`${materia} (Grupo B)`);
    }
    this.materiasDuplicadas = [...materiasDuplicadasTemp];
  }

  getClaseMateria(materia: string): string {
    switch (materia) {
      case 'Seminario de tecnologias':
        return 'materia-seminario';
      case 'Costos':
        return 'materia-costos';
      case 'Algebra':
        return 'materia-algebra';
      default:
        return 'dato-agregado';
    }
  }
}
