import { Component } from '@angular/core';
import { Usuario, Horario, Materia, DisponibilidadMaestro, Carrera, DisponibilidadIngles } from '../database/database';
import { Router } from "@angular/router";
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
  DisponibilidadIngles: DisponibilidadIngles = new DisponibilidadIngles();
  DisponibilidadRegular: DisponibilidadMaestro = new DisponibilidadMaestro();
  DisponibilidadIrregular: DisponibilidadMaestro = new DisponibilidadMaestro();

  Carreras: Carrera[] = new Array();
  Ciclos: string[] = new Array();
  Periodos: number[] = new Array();
  Materias: Materia[] = new Array();
  MateriasIrregulares: Materia[] = new Array();
  MaestrosRegulares: Usuario[] = new Array();
  MaestrosIrregulares: Usuario[] = new Array();

  Carrera: number = -1;
  MaestroRegular: number = -1;
  MaestroIrregular: number = -1;
  MateriaRegular: number = -1;
  MateriaIrregular: number = -1;
  HorasDisponibles: number = 0;

  nuevoHorario: boolean = true;
  cambiosRecientes: boolean = false;
  cambiosRecientesI: boolean = false;
  disponibilidadIngles: boolean = false;
  mostrarHorarioIrregular: boolean = false;
  deshabilitarMateriasIrregulares: boolean = true;
  horarioRegularHabilitado: boolean = false;
  horarioIrregularHabilitado: boolean = false;
  materiaDuplicada: boolean = false;

  constructor(public router: Router, private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }

    this.obtenerCarreras();
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
    } catch { }

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  limpiarMaestroMateria() {
    (document.getElementById('materia') as HTMLInputElement).disabled = true;
    this.deshabilitarMateriasIrregulares = true;
    this.Materias = new Array();
    this.MateriasIrregulares = new Array();
    this.MateriaRegular = -1;
    this.MateriaIrregular = -1;

    (document.getElementById('maestro') as HTMLInputElement).disabled = true;
    if (this.mostrarHorarioIrregular) {
      (document.getElementById('maestroI') as HTMLInputElement).disabled = true;
    }
    this.MaestrosRegulares = new Array();
    this.MaestrosIrregulares = new Array();
    this.MaestroRegular = -1;
    this.MaestroIrregular = -1;

    this.vaciarHorario();
    this.horarioRegularHabilitado = false;
    this.horarioIrregularHabilitado = false;
    this.mostrarHorarioIrregular = false;
  }

  cargarIngles() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != 0) {
      this.DisponibilidadIngles = new DisponibilidadIngles();
      const periodicidad = this.Carreras[this.Carrera].Periodicidad;
      const DisponibilidadCol = collection(this.firestore, "DisponibilidadIngles");
      const Query = query(DisponibilidadCol, where("IdDisponibilidad", "==", `${periodicidad}_${this.Horario.Ciclo}_${this.Horario.Periodo}`));

      let flag = true;
      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (flag) {
          flag = false;

          if (snapDisponibilidad.length > 0) {
            this.DisponibilidadIngles.setData(snapDisponibilidad[0]);
            this.disponibilidadIngles = true;
          } else {
            this.disponibilidadIngles = false;
          }
        }
      });
    }
  }

  cargarMaterias() {
    const MateriaCol = collection(this.firestore, "Materia");
    const Query = query(MateriaCol,
      where("Carrera", "==", this.Carreras[this.Carrera].Nombre),
      where("Periodo", "==", this.Horario.Periodo)
    );

    let flag = true;
    collectionData(Query).subscribe((snapMaterias) => {
      if (flag) {
        flag = false;

        for (let i = 0; i < snapMaterias.length; i++) {
          this.Materias[i] = new Materia();
          this.Materias[i].setData(snapMaterias[i]);
        }
      }
    });

    (document.getElementById('materia') as HTMLInputElement).disabled = false;
  }

  cargarMateriasI() {
    if (this.Horario.Periodo > 1) {
      const MateriaCol = collection(this.firestore, "Materia");
      const Query = query(MateriaCol,
        where("Carrera", "==", this.Carreras[this.Carrera].Nombre),
        where("Periodo", "<", this.Horario.Periodo)
      );

      let flag = true;
      collectionData(Query).subscribe((snapMaterias) => {
        if (flag) {
          flag = false;

          for (let i = 0; i < snapMaterias.length; i++) {
            this.MateriasIrregulares[i] = new Materia();
            this.MateriasIrregulares[i].setData(snapMaterias[i]);
          }
        }
      });

      this.deshabilitarMateriasIrregulares = false;
    }
  }

  duplicarMaterias() {
    if (this.MateriaRegular > -1) {
      let materia = this.Materias[this.MateriaRegular];
      let materia1 = new Materia();
      let materia2 = new Materia();

      if (materia.HorasDisponibles == materia.Horas) {
        materia1.setData(materia);
        materia1.Nombre += " (Grupo A)";
        this.Materias.push(materia1);

        materia2.setData(materia);
        materia2.Nombre += " (Grupo B)";
        this.Materias.push(materia2);

        this.Materias.splice(this.MateriaRegular, 1);
        this.MateriaRegular = this.Materias.length - 2;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Materia Registrada',
          text: 'No se puede duplicar la materia porque está registrada en el horario.'
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Seleccione una materia para dividir.'
      });
    }
  }

  combinarMaterias() {
    if (this.MateriaRegular > -1) {
      let materia1 = this.Materias[this.MateriaRegular];
      let i = this.MateriaRegular;

      if (materia1.HorasDisponibles == materia1.Horas) {
        let grupo = materia1.Nombre.substring(materia1.Nombre.indexOf('('));
        const nombre = `${materia1.Nombre.substring(0, materia1.Nombre.indexOf('(') - 1)}`;

        if (grupo == "(Grupo A)") {
          this.Materias.splice(i, 2);
        } else if (grupo == "(Grupo B)") {
          i--;
          this.Materias.splice(i, 2);
        }

        materia1.Nombre = nombre;
        this.Materias.push(materia1);
        this.MateriaRegular = this.Materias.length - 1;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Materia Registrada',
          text: 'No se puede combinar la materia porque está registrada en el horario.'
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Seleccione la materia para combinar.'
      });
    }
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
            this.nuevoHorario = false;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Horario Existente',
              text: 'Se encontró el horario!',
              showConfirmButton: false,
              timer: 1200
            }).then(() => {
              if (this.disponibilidadIngles) {
                for (let i = 0; i < this.DisponibilidadIngles.Disponibilidad.length; i++) {
                  for (let j = 0; j < this.DisponibilidadIngles.Disponibilidad[i].registro.length; j++) {
                    if (this.DisponibilidadIngles.Disponibilidad[i].registro[j].disponible) {
                      this.Horario.HorarioRegular[i].registro[j].maestro = "INGLÉS";
                    }
                  }
                }
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Horario de Inglés',
                  text: 'Aún no existe un horario de inglés para este ciclo.'
                });
              }
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'question',
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

                if (this.disponibilidadIngles) {
                  for (let i = 0; i < this.DisponibilidadIngles.Disponibilidad.length; i++) {
                    for (let j = 0; j < this.DisponibilidadIngles.Disponibilidad[i].registro.length; j++) {
                      if (this.DisponibilidadIngles.Disponibilidad[i].registro[j].disponible) {
                        this.Horario.HorarioRegular[i].registro[j].maestro = "INGLÉS";
                      }
                    }
                  }
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Horario de Inglés',
                    text: 'Aún no existe un horario de inglés para este ciclo.'
                  });
                }
              }
            });
          }
        }
      });

      this.cambiosRecientes = false;
      this.cambiosRecientesI = false;
      this.cargarMaterias();
      this.cargarMateriasI();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Favor de llenar los campos de Ciclo, Carrera y Periodo.'
      });
    }
  }

  limpiarHorario() {
    const disponibilidadDocente = this.DisponibilidadRegular.Disponibilidad;

    for (let i = 0; i < disponibilidadDocente.length; i++) {
      for (let j = 0; j < disponibilidadDocente[i].registro.length; j++) {
        if (document.getElementById(`c${i}${j}r`)?.classList.contains('dato-agregado')) {
          document.getElementById(`c${i}${j}r`)?.classList.remove('dato-agregado');
        }
      }
    }

    let materia = this.Materias[this.MateriaRegular].Nombre;
    if (materia.indexOf('(') > 0) {
      this.materiaDuplicada = true;
    } else {
      this.materiaDuplicada = false;
    }

    this.horarioRegularHabilitado = false;
  }

  limpiarHorarioI() {
    const disponibilidadDocente = this.DisponibilidadIrregular.Disponibilidad;

    for (let i = 0; i < disponibilidadDocente.length; i++) {
      for (let j = 0; j < disponibilidadDocente[i].registro.length; j++) {
        if (document.getElementById(`c${i}${j}i`)?.classList.contains('dato-agregado')) {
          document.getElementById(`c${i}${j}i`)?.classList.remove('dato-agregado');
        }
      }
    }

    this.horarioIrregularHabilitado = false;
  }

  obtenerMaestros() {
    this.limpiarHorario();

    const MaestroCol = collection(this.firestore, "Usuario");
    const Query = query(MaestroCol,
      where("TipoUsuario", "==", "Maestro"),
      where("Materias", "array-contains", this.Materias[this.MateriaRegular].IdMateria)
    );

    this.MaestrosRegulares = new Array();
    this.MaestroRegular = -1;

    let flag = true;
    collectionData(Query).subscribe((snapMaestros) => {
      if (flag) {
        flag = false;

        for (let i = 0; i < snapMaestros.length; i++) {
          this.MaestrosRegulares[i] = new Usuario();
          this.MaestrosRegulares[i].setData(snapMaestros[i]);
        }
      }
    });

    this.HorasDisponibles = this.Materias[this.MateriaRegular].HorasDisponibles;
    (document.getElementById('maestro') as HTMLInputElement).disabled = false;
  }

  obtenerMaestrosI() {
    this.limpiarHorarioI();

    const MaestroCol = collection(this.firestore, "Usuario");
    const Query = query(MaestroCol,
      where("TipoUsuario", "==", "Maestro"),
      where("Materias", "array-contains", this.MateriasIrregulares[this.MateriaIrregular].IdMateria)
    );

    this.MaestrosIrregulares = new Array();
    this.MaestroIrregular = -1;

    let flag = true;
    collectionData(Query).subscribe((snapMaestros) => {
      if (flag) {
        flag = false;

        for (let i = 0; i < snapMaestros.length; i++) {
          this.MaestrosIrregulares[i] = new Usuario();
          this.MaestrosIrregulares[i].setData(snapMaestros[i]);
        }
      }
    });

    (document.getElementById('maestroI') as HTMLInputElement).disabled = false;
  }

  buscarDisponibilidad() {
    if (this.MaestroRegular > -1 && this.MateriaRegular > -1) {
      this.limpiarHorario();

      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol, where("IdDisponibilidad", "==", `${this.MaestrosRegulares[this.MaestroRegular].IdUsuario}_${this.Horario.Ciclo}`));

      this.DisponibilidadRegular = new DisponibilidadMaestro();

      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (snapDisponibilidad.length > 0) {
          this.DisponibilidadRegular.setData(snapDisponibilidad[0]);
        }
      });
    }
  }

  buscarDisponibilidadI() {
    if (this.MaestroIrregular > -1 && this.MateriaIrregular > -1) {
      this.limpiarHorarioI();

      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol, where("IdDisponibilidad", "==", `${this.MaestrosIrregulares[this.MaestroIrregular].IdUsuario}_${this.Horario.Ciclo}`));

      this.DisponibilidadIrregular = new DisponibilidadMaestro();

      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (snapDisponibilidad.length > 0) {
          this.DisponibilidadIrregular.setData(snapDisponibilidad[0]);
        }
      });
    }
  }

  cargarDisponibilidad() {
    if (this.Horario.Ciclo == "" || this.Horario.Carrera == "" || this.Horario.Periodo == 0) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Favor de llenar los campos de Ciclo, Carrera y Periodo.'
      });
      return;
    }
    if (this.MaestroRegular == -1) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Seleccione un maestro.'
      });
      return;
    }
    if (this.DisponibilidadRegular.IdDisponibilidad == "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Sin Disponibilidad',
        text: 'Este usuario no tiene una disponibilidad registrada para el ciclo seleccionado.'
      });
      return;
    }

    const disponibilidadDocente = this.DisponibilidadRegular.Disponibilidad;
    const horario = this.Horario.HorarioRegular;
    const maestro = this.MaestrosRegulares[this.MaestroRegular].Nombre;
    const materia = this.Materias[this.MateriaRegular].Nombre;

    for (let i = 0; i < disponibilidadDocente.length; i++) {
      for (let j = 0; j < disponibilidadDocente[i].registro.length; j++) {
        if (((disponibilidadDocente[i].registro[j].disponible && horario[i].registro[j].maestro == "")
          || (horario[i].registro[j].maestro == maestro && horario[i].registro[j].texto == materia))
          && horario[i].registro[j].maestro != "INGLÉS") {
          document.getElementById(`c${i}${j}r`)?.classList.add('dato-agregado');
        } else if (document.getElementById(`c${i}${j}r`)?.classList.contains('dato-agregado')) {
          document.getElementById(`c${i}${j}r`)?.classList.remove('dato-agregado');
        }

        if (horario[i].registro[j].texto == materia && this.materiaDuplicada) {
          this.HorasDisponibles--;
        }
      }
    }

    this.Materias[this.MateriaRegular].HorasDisponibles = this.HorasDisponibles;
    this.horarioRegularHabilitado = true;

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Disponibilidad Cargada!',
      text: 'Ya puede comenzar a editar su horario.',
      showConfirmButton: false,
      timer: 1200
    });
  }

  cargarDisponibilidadI() {
    if (this.MaestroIrregular == -1) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Seleccione un maestro.'
      });
      return;
    }
    if (this.DisponibilidadIrregular.IdDisponibilidad == "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Sin Disponibilidad',
        text: 'Este usuario no tiene una disponibilidad registrada para el ciclo seleccionado.'
      });
      return;
    }

    const disponibilidadDocente = this.DisponibilidadIrregular.Disponibilidad;
    const horario = this.Horario.HorarioIrregular;
    const maestro = this.MaestrosIrregulares[this.MaestroIrregular].Nombre;
    const materia = this.MateriasIrregulares[this.MateriaIrregular].Nombre;

    for (let i = 0; i < disponibilidadDocente.length; i++) {
      for (let j = 0; j < disponibilidadDocente[i].registro.length; j++) {
        if (disponibilidadDocente[i].registro[j].disponible
          || (horario[i].registro[j].maestro == maestro && horario[i].registro[j].texto == materia)) {
          document.getElementById(`c${i}${j}i`)?.classList.add('dato-agregado');
        } else if (document.getElementById(`c${i}${j}i`)?.classList.contains('dato-agregado')) {
          document.getElementById(`c${i}${j}i`)?.classList.remove('dato-agregado');
        }
      }
    }

    this.horarioIrregularHabilitado = true;

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Disponibilidad Cargada!',
      text: 'Ya puede comenzar a editar su horario.',
      showConfirmButton: false,
      timer: 1200
    });
  }

  iniciarRegistro(iniciar: boolean) {
    (document.getElementById('carrera') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('ciclo') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('periodo') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('buscar') as HTMLButtonElement).disabled = iniciar;

    (document.getElementById('materia') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('maestro') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('cargar') as HTMLButtonElement).disabled = iniciar;

    if (this.materiaDuplicada) {
      (document.getElementById('combinar') as HTMLButtonElement).disabled = iniciar;
    } else {
      (document.getElementById('dividir') as HTMLButtonElement).disabled = iniciar;
    }

    if (this.mostrarHorarioIrregular) {
      (document.getElementById('materiaI') as HTMLInputElement).disabled = iniciar;
      (document.getElementById('maestroI') as HTMLInputElement).disabled = iniciar;
      (document.getElementById('cargarI') as HTMLButtonElement).disabled = iniciar;
    }
  }

  openSwalModalR(i: number, j: number) {
    if (this.horarioRegularHabilitado) {
      const materiaSeleccionada = this.Materias[this.MateriaRegular].Nombre;
      let maestroSeleccionado = this.MaestrosRegulares[this.MaestroRegular];
      const celda = document.getElementById(`c${i}${j}r`);
      let registroHorario = this.Horario.HorarioRegular[i].registro[j];

      if (registroHorario.maestro == "INGLÉS") {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Horario de Inglés',
          text: 'No se puede modificar el horario de inglés.'
        });
        return;
      }

      if ((celda?.classList.contains('dato-agregado') && this.HorasDisponibles > 0 && maestroSeleccionado.Horas > 0)
        || registroHorario.texto == materiaSeleccionada) {
        Swal.fire({
          title: 'Ingrese el Aula',
          html: `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
          focusConfirm: true,
          showDenyButton: true,
          showCloseButton: true,
          denyButtonText: 'Borrar',
          preConfirm: () => {
            const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
            return { valor3 };
          },
        }).then((result) => {
          const { valor3 } = result.value;
          const valorAnterior = registroHorario.salon;
          const disponibilidad = this.DisponibilidadRegular.Disponibilidad[i].registro[j];

          if (result.isConfirmed) {
            if (valor3 != "") {
              registroHorario.salon = disponibilidad.aula = "Aula: " + valor3;
              registroHorario.maestro = maestroSeleccionado.Nombre;
              registroHorario.texto = disponibilidad.materia = materiaSeleccionada;
              disponibilidad.carrera = this.Carreras[this.Carrera].Nombre;
              disponibilidad.disponible = false;
              if (valorAnterior != valor3) {
                this.HorasDisponibles--;
                maestroSeleccionado.Horas--;
                this.cambiosRecientes = true;
              }
            } else {
              Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Faltan Campos',
                text: 'Debe insertar un número de salón.',
                showConfirmButton: true
              });
            }
          }
          if (result.isDenied && registroHorario.salon != "") {
            registroHorario.salon = disponibilidad.aula = "";
            registroHorario.maestro = "";
            registroHorario.texto = disponibilidad.materia = "";
            disponibilidad.carrera = "";
            disponibilidad.disponible = true;
            this.HorasDisponibles++;
            maestroSeleccionado.Horas++;
            this.cambiosRecientes = true;
          }

          this.Horario.HorarioRegular[i].registro[j] = registroHorario;
          this.DisponibilidadRegular.Disponibilidad[i].registro[j] = disponibilidad;
          this.MaestrosRegulares[this.MaestroRegular] = maestroSeleccionado;
          this.Materias[this.MateriaRegular].HorasDisponibles = this.HorasDisponibles;

          if (this.cambiosRecientes) {
            this.iniciarRegistro(true);
          }
        });
      } else if (celda?.classList.contains('dato-agregado') == false) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocupado',
          text: 'Este docente no se encuentra disponible a esta hora.',
          showConfirmButton: true
        });
      } else if (maestroSeleccionado.Horas == 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Horas de Docente',
          text: 'Este maestro alcanzó su límite de horas.'
        });
        return;
      } else if (this.HorasDisponibles == 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Horas de Materia',
          text: 'Alcanzó el límite de horas de la materia.',
          showConfirmButton: true
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Falta Disponibilidad',
        text: 'Aún no se ha cargado una disponibilidad.',
        showConfirmButton: true
      });
    }
  }

  openSwalModalI(i: number, j: number) {
    if (this.horarioIrregularHabilitado) {
      const materiaSeleccionada = this.MateriasIrregulares[this.MateriaIrregular].Nombre;
      let maestroSeleccionado = this.MaestrosIrregulares[this.MaestroIrregular];
      const celda = document.getElementById(`c${i}${j}i`);
      let registroHorario = this.Horario.HorarioIrregular[i].registro[j];

      if ((celda?.classList.contains('dato-agregado') && maestroSeleccionado.Horas > 0) || registroHorario.texto == materiaSeleccionada) {
        Swal.fire({
          title: 'Ingrese el Aula',
          html: `<input id="valor3" class="swal2-input" placeholder="Valor 3">`,
          focusConfirm: true,
          showDenyButton: true,
          showCloseButton: true,
          denyButtonText: 'Borrar',
          preConfirm: () => {
            const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
            return { valor3 };
          },
        }).then((result) => {
          const { valor3 } = result.value;
          const valorAnterior = registroHorario.salon;
          const disponibilidad = this.DisponibilidadIrregular.Disponibilidad[i].registro[j];

          if (result.isConfirmed) {
            if (valor3 != "") {
              registroHorario.salon = disponibilidad.aula = "Aula: " + valor3;
              registroHorario.maestro = maestroSeleccionado.Nombre;
              registroHorario.texto = disponibilidad.materia = materiaSeleccionada;
              disponibilidad.carrera = this.Carreras[this.Carrera].Nombre;
              disponibilidad.disponible = false;
              this.cambiosRecientesI = true;
            } else {
              Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Faltan Campos',
                text: 'Debe insertar un número de salón.',
                showConfirmButton: true
              });
            }
          }
          if (result.isDenied && registroHorario.salon != "") {
            registroHorario.salon = disponibilidad.aula = "";
            registroHorario.maestro = "";
            registroHorario.texto = disponibilidad.materia = "";
            disponibilidad.carrera = "";
            disponibilidad.disponible = true;
            this.cambiosRecientesI = true;
          }

          this.Horario.HorarioIrregular[i].registro[j] = registroHorario;
          this.DisponibilidadIrregular.Disponibilidad[i].registro[j] = disponibilidad;
          this.MaestrosIrregulares[this.MaestroIrregular] = maestroSeleccionado;

          if (this.cambiosRecientesI) {
            this.iniciarRegistro(true);
          }
        });
      } else if (celda?.classList.contains('dato-agregado') == false) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocupado',
          text: 'Este docente no se encuentra disponible a esta hora.',
          showConfirmButton: true
        });
      } else if (maestroSeleccionado.Horas == 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Horas de Docente',
          text: 'Este maestro alcanzó su límite de horas.'
        });
        return;
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Falta Disponibilidad',
        text: 'Aún no se ha cargado una disponibilidad.',
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

  adddelMaestro() {
    const horario = this.Horario.HorarioRegular;
    const horarioI = this.Horario.HorarioIrregular;
    const maestro = this.MaestrosRegulares[this.MaestroRegular];

    for (let i = 0; i < horario.length; i++) {
      for (let j = 0; j < horario[i].registro.length; j++) {
        if (horario[i].registro[j].maestro == maestro.Nombre) {
          this.Horario.Maestros.push(maestro.IdUsuario);
          this.Horario.Maestros = this.eliminarDuplicados(this.Horario.Maestros);
          return;
        }
      }
    }

    for (let i = 0; i < horarioI.length; i++) {
      for (let j = 0; j < horarioI[i].registro.length; j++) {
        if (horarioI[i].registro[j].maestro == maestro.Nombre) {
          this.Horario.Maestros.push(maestro.IdUsuario);
          this.Horario.Maestros = this.eliminarDuplicados(this.Horario.Maestros);
          return;
        }
      }
    }

    try {
      this.Horario.Maestros.splice(this.Horario.Maestros.indexOf(maestro.IdUsuario), 1);
    } catch { }
  }

  adddelMateria() {
    const horarioI = this.Horario.HorarioIrregular;
    const materia = this.Materias[this.MateriaRegular];

    if (materia.HorasDisponibles == 0) {
      this.Horario.Materias.push(materia.IdMateria);
    } else {
      for (let i = 0; i < horarioI.length; i++) {
        for (let j = 0; j < horarioI[i].registro.length; j++) {
          if (horarioI[i].registro[j].texto == materia.Nombre) {
            this.Horario.Materias.push(materia.IdMateria);
            this.Horario.Materias = this.eliminarDuplicados(this.Horario.Materias);
            return;
          }
        }
      }

      try {
        this.Horario.Materias.splice(this.Horario.Materias.indexOf(materia.IdMateria), 1);
      } catch { }
    }
  }

  adddelMaestroI() {
    const horario = this.Horario.HorarioIrregular;
    const horarioR = this.Horario.HorarioRegular;
    const maestro = this.MaestrosIrregulares[this.MaestroIrregular];

    for (let i = 0; i < horario.length; i++) {
      for (let j = 0; j < horario[i].registro.length; j++) {
        if (horario[i].registro[j].maestro == maestro.Nombre) {
          this.Horario.Maestros.push(maestro.IdUsuario);
          this.Horario.Maestros = this.eliminarDuplicados(this.Horario.Maestros);
          return;
        }
      }
    }

    for (let i = 0; i < horarioR.length; i++) {
      for (let j = 0; j < horarioR[i].registro.length; j++) {
        if (horarioR[i].registro[j].maestro == maestro.Nombre) {
          this.Horario.Maestros.push(maestro.IdUsuario);
          this.Horario.Maestros = this.eliminarDuplicados(this.Horario.Maestros);
          return;
        }
      }
    }

    try {
      this.Horario.Maestros.splice(this.Horario.Maestros.indexOf(maestro.IdUsuario), 1);
    } catch { }
  }

  adddelMateriaI() {
    const horario = this.Horario.HorarioIrregular;
    const horarioR = this.Horario.HorarioRegular;
    const materia = this.MateriasIrregulares[this.MateriaIrregular];

    for (let i = 0; i < horario.length; i++) {
      for (let j = 0; j < horario[i].registro.length; j++) {
        if (horario[i].registro[j].texto == materia.Nombre) {
          this.Horario.Materias.push(materia.IdMateria);
          this.Horario.Materias = this.eliminarDuplicados(this.Horario.Materias);
          return;
        }
      }
    }

    for (let i = 0; i < horarioR.length; i++) {
      for (let j = 0; j < horarioR[i].registro.length; j++) {
        if (horarioR[i].registro[j].texto == materia.Nombre) {
          this.Horario.Materias.push(materia.IdMateria);
          this.Horario.Materias = this.eliminarDuplicados(this.Horario.Materias);
          return;
        }
      }
    }

    try {
      this.Horario.Materias.splice(this.Horario.Materias.indexOf(materia.IdMateria), 1);
    } catch { }
  }

  guardarHorario() {
    if (this.horarioRegularHabilitado) {
      const horasMateria = this.Materias[this.MateriaRegular].Horas;

      if (this.cambiosRecientes == false) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Guardado Innecesario',
          text: 'No hay cambios recientes.',
          showConfirmButton: true
        });
        return;
      }
      if (this.HorasDisponibles < horasMateria && this.HorasDisponibles > 0) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Cambios en Progreso',
          text: 'Debe completar la asignación de horario antes de poder guardar.',
          showConfirmButton: true
        });
        return;
      }

      if (this.cambiosRecientes) {
        Swal.fire({
          title: 'Actualización',
          text: "¿Está seguro de estos cambios?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.adddelMaestro();
            this.adddelMateria();

            let rutaDoc = doc(this.firestore, "Horario", this.Horario.IdHorario);
            setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Horario)));

            if (this.nuevoHorario) {
              this.nuevoHorario = false;
            }

            if (this.materiaDuplicada == false) {
              let rutaDoc1 = doc(this.firestore, "Materia", this.Materias[this.MateriaRegular].IdMateria);
              setDoc(rutaDoc1, JSON.parse(JSON.stringify(this.Materias[this.MateriaRegular])));
            }

            let rutaDoc2 = doc(this.firestore, "DisponibilidadMaestro", this.DisponibilidadRegular.IdDisponibilidad);
            setDoc(rutaDoc2, JSON.parse(JSON.stringify(this.DisponibilidadRegular)));

            const maestro = this.MaestrosRegulares[this.MaestroRegular];
            let rutaDoc3 = doc(this.firestore, "Usuario", maestro.IdUsuario);
            let data = {
              Horas: maestro.Horas
            };
            updateDoc(rutaDoc3, data);

            this.iniciarRegistro(false);
            this.cambiosRecientes = false;

            console.log(this.Horario);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cambios Guardados',
              text: 'El horario se guardó de forma exitosa!',
              showConfirmButton: false,
              timer: 1200
            });
          }
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Falta Disponibilidad',
        text: 'Aún no se ha cargado una disponibilidad.',
        showConfirmButton: true
      });
    }
  }

  guardarHorarioI() {
    if (this.horarioIrregularHabilitado) {
      if (this.cambiosRecientesI == false) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Guardado Innecesario',
          text: 'No hay cambios recientes.',
          showConfirmButton: true
        });
        return;
      }

      if (this.cambiosRecientesI) {
        Swal.fire({
          title: 'Actualización',
          text: "¿Está seguro de estos cambios?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.adddelMaestroI();
            this.adddelMateriaI();

            let rutaDoc = doc(this.firestore, "Horario", this.Horario.IdHorario);
            setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Horario)));

            if (this.nuevoHorario) {
              this.nuevoHorario = false;
            }

            let rutaDoc2 = doc(this.firestore, "DisponibilidadMaestro", this.DisponibilidadIrregular.IdDisponibilidad);
            setDoc(rutaDoc2, JSON.parse(JSON.stringify(this.DisponibilidadIrregular)));

            const maestro = this.MaestrosIrregulares[this.MaestroIrregular];
            let rutaDoc3 = doc(this.firestore, "Usuario", maestro.IdUsuario);
            let data = {
              Horas: maestro.Horas
            };
            updateDoc(rutaDoc3, data);

            this.iniciarRegistro(false);
            this.cambiosRecientesI = false;

            console.log(this.Horario);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cambios Guardados',
              text: 'El horario se guardó de forma exitosa!',
              showConfirmButton: false,
              timer: 1200
            });
          }
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Falta Disponibilidad',
        text: 'Aún no se ha cargado una disponibilidad.',
        showConfirmButton: true
      });
    }
  }

  toggleIrregular() {
    this.mostrarHorarioIrregular = !this.mostrarHorarioIrregular;
  }
}