import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DisponibilidadMaestro, Horario, Materia, Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { Carrera } from '../database/database';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-materias',
  templateUrl: './asignar-materias.component.html',
  styleUrls: ['./asignar-materias.component.css']
})
export class AsignarMateriasComponent {
  Usuario: Usuario = new Usuario();
  docenteSeleccionado: Usuario = new Usuario();
  Horario: Horario = new Horario();
  Disponibilidad: DisponibilidadMaestro = new DisponibilidadMaestro();

  Carreras: Carrera[] = new Array();
  Materias: Materia[] = new Array();
  Periodos: number[] = new Array();
  Asignados: Usuario[] = new Array();
  Buscados: Usuario[] = new Array();

  Carrera: number = -1;
  Materia: number = -1;
  Periodo: number = 0;
  Maestro: string = "";
  horasTotales: number = 0;

  mostrarBusqueda = false

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }

    this.obtenerCarreras();
  }

  limpiarMaterias() {
    this.Asignados = new Array();

    (document.getElementById('materia') as HTMLInputElement).disabled = true;
    this.Materia = -1;

    (document.getElementById('profe') as HTMLInputElement).disabled = true;
    this.Maestro = "";
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

  obtenerPeriodos() {
    this.Periodos = new Array();

    for (let i = 0; i < this.Carreras[this.Carrera].CantidadPeriodos; i++) {
      this.Periodos[i] = i + 1;
    }

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  obtenerHorario() {
    const HorarioCol = collection(this.firestore, "Horario");
    const Query = query(HorarioCol,
      where("Carrera", "==", this.Carreras[this.Carrera].IdCarrera),
      where("Periodo", "==", this.Periodo)
    );

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

  buscarMaterias() {
    if (this.Carrera > -1 && this.Periodo != 0) {
      this.Materias = new Array();
      const MateriasC = collection(this.firestore, "Materia");
      const Query = query(MateriasC,
        where("Carrera", "==", this.Carreras[this.Carrera].Nombre),
        where("Periodo", "==", this.Periodo)
      );

      collectionData(Query).subscribe((snapMaterias) => {
        if (snapMaterias.length > 0) {
          for (let i = 0; i < snapMaterias.length; i++) {
            this.Materias[i] = new Materia();
            this.Materias[i].setData(snapMaterias[i]);
          }
        }
      });

      (document.getElementById('materia') as HTMLInputElement).disabled = false;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Llene los campos de Carrera y Periodo.'
      });
    }
  }

  buscarAsignados() {
    (document.getElementById('profe') as HTMLInputElement).disabled = false;

    this.Asignados = new Array();
    const AsignadosCol = collection(this.firestore, "Usuario");
    const Query = query(AsignadosCol,
      where("Materias", "array-contains", this.Materias[this.Materia].IdMateria)
    );

    let flagCmbMaterias = true;
    collectionData(Query).subscribe((snapAsignados) => {
      if (snapAsignados.length > 0 && flagCmbMaterias) {
        flagCmbMaterias = false;
        for (let i = 0; i < snapAsignados.length; i++) {
          this.Asignados[i] = new Usuario();
          this.Asignados[i].setData(snapAsignados[i]);
        }
      }
    });
  }

  buscador() {
    if (this.Maestro.trim() !== '') {
      this.mostrarBusqueda = true
      this.Buscados = new Array();
      const MaestroCol = collection(this.firestore, "Usuario");
      const Query = query(MaestroCol,
        where("Nombre", "<=", this.Maestro + '\uf8ff'),
        where("Nombre", ">=", this.Maestro)
      );

      collectionData(Query).subscribe((snapBuscados) => {
        if (snapBuscados.length > 0) {
          for (let i = 0; i < snapBuscados.length; i++) {
            this.Buscados[i] = new Usuario();
            this.Buscados[i].setData(snapBuscados[i]);
          }
        }
      });
    };
  }

  pasardato(profesor: Usuario) {
    this.docenteSeleccionado = profesor;
    this.Maestro = profesor.Nombre;
  }

  obtenerDisponibilidad(profesor: Usuario) {
    const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
    const Query = query(DisponibilidadCol,
      where("IdDisponibilidad", "==", `${profesor.IdUsuario}_${this.Horario.Ciclo}`)
    );

    let flag = true;
    collectionData(Query).subscribe((snapDisp) => {
      if (flag) {
        flag = false;
        if (snapDisp.length > 0) {
          this.Disponibilidad.setData(snapDisp[0]);
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

  asignarMateria() {
    if (this.docenteSeleccionado.IdUsuario != "" || this.Materia != -1) {
      this.docenteSeleccionado.Materias.push(this.Materias[this.Materia].IdMateria);
      this.docenteSeleccionado.Materias = this.eliminarDuplicados(this.docenteSeleccionado.Materias);
      this.Asignados.push(this.docenteSeleccionado);

      let rutaDoc = doc(this.firestore, "Usuario", this.docenteSeleccionado.IdUsuario);
      let data = {
        Materias: this.docenteSeleccionado.Materias
      };

      updateDoc(rutaDoc, data);
      this.buscarAsignados();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Maestro Asignado Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.Maestro = "";
      this.mostrarBusqueda = false

    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Seleccione una materia y un docente.'
      });
    }
  }

  borrarMateria(i: number) {
    this.obtenerDisponibilidad(this.Asignados[i]);
    
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '¿Desasignar docente?',
      text: 'Desasignar a este docente eliminará los registros de horario existentes ' +
        'que contengan a este docente impartiendo esta materia.',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        const docente = this.Asignados[i];
        console.log(this.Disponibilidad);

        const materia = this.Materias[this.Materia];
        const horarioR = this.Horario.HorarioRegular;
        const horarioI = this.Horario.HorarioIrregular;
        const disp = this.Disponibilidad.Disponibilidad;

        for (let i = 0; i < horarioR.length; i++) {
          for (let j = 0; j < horarioR[i].registro.length; j++) {
            if (horarioR[i].registro[j].maestro == docente.Nombre && horarioR[i].registro[j].texto == materia.Nombre) {
              horarioR[i].registro[j].salon = disp[i].registro[j].aula = "";
              horarioR[i].registro[j].maestro = "";
              horarioR[i].registro[j].texto = disp[i].registro[j].materia = "";
              disp[i].registro[j].carrera = "";
              disp[i].registro[j].disponible = true;
              docente.Horas++;
            } else if (horarioI[i].registro[j].maestro == docente.Nombre && horarioI[i].registro[j].texto == materia.Nombre) {
              horarioI[i].registro[j].salon = disp[i].registro[j].aula = "";
              horarioI[i].registro[j].maestro = "";
              horarioI[i].registro[j].texto = disp[i].registro[j].materia = "";
              disp[i].registro[j].carrera = "";
              disp[i].registro[j].disponible = true;
              docente.Horas++;
            }
          }
        }

        this.Horario.HorarioRegular = horarioR;
        this.Horario.HorarioIrregular = horarioI;
        this.Disponibilidad.Disponibilidad = disp;

        docente.Materias.splice(docente.Materias.indexOf(materia.IdMateria), 1);
        this.Asignados.splice(i, 1);

        let rutaDoc = doc(this.firestore, "Usuario", docente.IdUsuario);
        setDoc(rutaDoc, JSON.parse(JSON.stringify(docente)));

        let rutaDoc1 = doc(this.firestore, "Horario", this.Horario.IdHorario);
        setDoc(rutaDoc1, JSON.parse(JSON.stringify(this.Horario)));

        let rutaDoc2 = doc(this.firestore, "DisponibilidadMaestro", this.Disponibilidad.IdDisponibilidad);
        setDoc(rutaDoc2, JSON.parse(JSON.stringify(this.Disponibilidad)));
      }
    });
  }
}