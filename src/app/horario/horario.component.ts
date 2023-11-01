import { Component } from '@angular/core';
import { Usuario, Horario, Materia, DisponibilidadMaestro, Carrera } from '../database/database';
import { DocumentData } from 'firebase/firestore';
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
  Disponibilidad: DisponibilidadMaestro = new DisponibilidadMaestro();

  Carreras: Carrera[] = new Array();
  Ciclos: string[] = new Array();
  Periodos: number[] = new Array();
  Materias: Materia[] = new Array();
  Maestros: Usuario[] = new Array();
  materiasOriginales: string[] = ["Seminario de tecnologias", "Algebra", "Costos"];
  materiasDuplicadas: string[] = this.materiasOriginales;

  maestroSeleccionado = "";
  materiaSeleccionada = "";

  mostrarHorarioIrregular: boolean = false;
  nuevoHorario: boolean = true;
  horarioHabilitado: boolean = false;
  disponibilidadCargada: boolean = false;

  constructor(private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    this.obtenerCarreras();
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
    this.Ciclos = new Array();
    const añoActual = new Date().getFullYear();
    this.Ciclos.push(`${añoActual}-01`);
    this.Ciclos.push(`${añoActual}-02`);

    const carreraSeleccionada = this.Horario.Carrera;
    let periodicidad = "";

    this.Carreras.forEach(function (carrera) {
      if (carrera.Nombre == carreraSeleccionada) {
        periodicidad = carrera.Periodicidad;
      }
    });

    if (periodicidad == "Cuatrimestral") {
      this.Ciclos.push(`${añoActual}-03`);
    }

    (document.getElementById('ciclo') as HTMLInputElement).disabled = false;
  }

  obtenerPeriodos() {
    this.Periodos = new Array();

    const carreraSeleccionada = this.Horario.Carrera;
    let periodos = 0;

    this.Carreras.forEach(function (carrera) {
      if (carrera.Nombre == carreraSeleccionada) {
        periodos = carrera.CantidadPeriodos;
      }
    });

    for (let i = 1; i <= periodos; i++) {
      this.Periodos[i - 1] = i;
    }

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  limpiarMaestroMateria() {
    this.Materias = new Array();
    this.Maestros = new Array();
  }

  obtenerMaterias() {
    const MateriaCol = collection(this.firestore, "Materia");
    const Query = query(MateriaCol,
      where("Carrera", "==", this.Horario.Carrera),
      where("Periodo", "==", this.Horario.Periodo)
    );

    collectionData(Query).subscribe((snapMaterias) => {
      for (let i = 0; i < snapMaterias.length; i++) {
        this.Materias[i] = new Materia();
        this.Materias[i].setData(snapMaterias[i]);
      }
    });
  }

  obtenerMaestros() {
    const MaestroCol = collection(this.firestore, "Usuario");
    const Query = query(MaestroCol, where("TipoUsuario", "==", "Maestro"));

    collectionData(Query).subscribe((snapMaestros) => {
      for (let i = 0; i < snapMaestros.length; i++) {
        this.Maestros[i] = new Usuario();
        this.Maestros[i].setData(snapMaestros[i]);
      }
    });

    (document.getElementById('disabledSelect3') as HTMLInputElement).disabled = false;
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

        this.obtenerMaterias();

        (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = false;
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

  buscarMaestro() {
    const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
    const Query = query(DisponibilidadCol,
      where("Nombre", "==", this.maestroSeleccionado),
      where("Ciclo", "==", this.Horario.Ciclo)
    );

    collectionData(Query).subscribe((snapDisponibilidad) => {
      if (snapDisponibilidad.length > 0) {
        this.Disponibilidad.setData(snapDisponibilidad[0]);
      }
    });
  }

  resaltarMaestro() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      if (this.maestroSeleccionado != "") {
        for (let i = 0; i < this.Disponibilidad.Disponibilidad.length; i++) {
          for (let j = 0; j < this.Disponibilidad.Disponibilidad[i].registro.length; j++) {
            if (this.Disponibilidad.Disponibilidad[i].registro[j].disponible) {
              document.getElementById(`c${i}${j}`)?.classList.add('dato-agregado');
            } else if (document.getElementById(`c${i}${j}`)?.classList.contains('dato-agregado')) {
              document.getElementById(`c${i}${j}`)?.classList.remove('dato-agregado');
            }
          }
        }

        this.horarioHabilitado = true;
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Seleccione un maestro.',
          showConfirmButton: true
        });
      }
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
      this.buscarMaestro();
    } else {
      this.horarioHabilitado = false;
    }
  }

  openSwalModalR(i: number, j: number) {
    if (this.horarioHabilitado) {
      if (document.getElementById(`c${i}${j}`)?.classList.contains('dato-agregado')) {
        const materiaSeleccionada = this.materiaSeleccionada;
        const maestroSeleccionado = this.maestroSeleccionado;

        Swal.fire({
          title: 'Ingresa el salón',
          html: `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
          focusConfirm: false,
          showDenyButton: true,
          showCloseButton: true,
          denyButtonText: 'Borrar',
          preConfirm: () => {
            const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
            return { valor3 };
          },
        }).then((result) => {
          const { valor3 } = result.value;

          if (result.isConfirmed) {
            this.Horario.HorarioRegular[i].registro[j].salon = "Salón: " + valor3;
            this.Horario.HorarioRegular[i].registro[j].maestro = maestroSeleccionado;
            this.Horario.HorarioRegular[i].registro[j].texto = materiaSeleccionada;

            const cell = document.getElementById(`c${i}${j}`);
            if (cell) {
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
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Este docente no se encuentra disponible a esta hora.',
          showConfirmButton: true
        });
      }
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Aún no se ha cargado una disponibilidad.',
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
    if (this.horarioHabilitado) {
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
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Aún no se ha cargado una disponibilidad.',
        showConfirmButton: true
      });
    }
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
