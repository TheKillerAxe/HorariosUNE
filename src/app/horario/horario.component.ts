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
  MaestrosRegulares: Usuario[] = new Array();
  MaestrosIrregulares: Usuario[] = new Array();
  materiasOriginales: string[] = ["Seminario de tecnologias", "Algebra", "Costos"];
  materiasDuplicadas: string[] = this.materiasOriginales;

  Carrera: number = -1;
  maestroRegular: string = "";
  materiaRegular: number = -1;
  maestroIrregular: string = "";
  materiaIrregular: number = -1;
  HorasMateria: number = 0;
  HorasDisponibles: number = 0;
  HorasMateriaIrregular: number = 0;
  HorasDisponiblesIrregular: number = 0;

  mostrarHorarioIrregular: boolean = false;
  nuevoHorario: boolean = true;
  horarioRegularHabilitado: boolean = false;
  horarioIrregularHabilitado: boolean = false;
  disponibilidadCargada: boolean = false;

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
    this.Horario.Carrera = this.Carreras[this.Carrera].IdCarrera;

    this.Ciclos = new Array();
    const añoActual = new Date().getFullYear();
    this.Ciclos.push(`${añoActual}-01`);
    this.Ciclos.push(`${añoActual}-02`);

    let periodicidad = this.Carreras[this.Carrera].Periodicidad;

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
      if (carrera.IdCarrera == carreraSeleccionada) {
        periodos = carrera.CantidadPeriodos;
      }
    });

    for (let i = 1; i <= periodos; i++) {
      this.Periodos[i - 1] = i;
    }

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  limpiarMaestroMateria() {
    (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = true;
    this.Materias = new Array();
    this.materiaRegular = -1;

    (document.getElementById('disabledSelect3') as HTMLInputElement).disabled = true;
    this.MaestrosRegulares = new Array();
    this.maestroRegular = "";
  }

  cargarIngles() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      this.DisponibilidadIngles = new DisponibilidadIngles();
      let periodicidad = this.Carreras[this.Carrera].Periodicidad;

      const DisponibilidadCol = collection(this.firestore, "DisponibilidadIngles");
      const Query = query(DisponibilidadCol, where("IdDisponibilidad", "==", `${periodicidad}_${this.Horario.Ciclo}_${this.Horario.Periodo}`));

      let flag = true;
      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (flag) {
          flag = false;

          if (snapDisponibilidad.length > 0) {
            this.DisponibilidadIngles.setData(snapDisponibilidad[0]);
            console.log(this.DisponibilidadIngles);
          }
        }
      });
    }
  }

  buscarHorario() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      this.Horario.IdHorario = `${this.Horario.Ciclo}-${this.Horario.Carrera}-${this.Horario.Periodo}`;

      const HorarioCol = collection(this.firestore, "Horario");
      const Query = query(HorarioCol, where("IdHorario", "==", this.Horario.IdHorario));

      let flag = true;
      collectionData(Query).subscribe((snapHorarios) => {
        if (flag) {
          flag = false;

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

            (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = false;
            (document.getElementById('materiaI') as HTMLInputElement).disabled = false;
            
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
                let _id = this.Horario.IdHorario;
                let _ciclo = this.Horario.Ciclo;
                let _carrera = this.Horario.Carrera;
                let _periodo = this.Horario.Periodo;

                this.Horario = new Horario();

                this.Horario.IdHorario = _id;
                this.Horario.Ciclo = _ciclo;
                this.Horario.Carrera = _carrera;
                this.Horario.Periodo = _periodo;

                for (let i = 0; i < this.DisponibilidadIngles.Disponibilidad.length; i++) {
                  for (let j = 0; j < this.DisponibilidadIngles.Disponibilidad[i].registro.length; j++) {
                    if (this.DisponibilidadIngles.Disponibilidad[i].registro[j].disponible) {
                      this.Horario.HorarioRegular[i].registro[j].maestro = "INGLÉS";
                    }
                  }
                }

                this.nuevoHorario = true;

                (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = false;
                (document.getElementById('materiaI') as HTMLInputElement).disabled = false;
              }
            });
          }

          const MateriaCol = collection(this.firestore, "Materia");
          const Query = query(MateriaCol,
            where("Carrera", "==", this.Carreras[this.Carrera].Nombre),
            where("Periodo", "==", this.Horario.Periodo)
          );

          collectionData(Query).subscribe((snapMaterias) => {
            for (let i = 0; i < snapMaterias.length; i++) {
              this.Materias[i] = new Materia();
              this.Materias[i].setData(snapMaterias[i]);
            }
          });
        }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Favor de llenar los campos de Ciclo, Carrera y Periodo.'
      });
    }
  }

  obtenerMaestros() {
    this.MaestrosRegulares = new Array();

    const MaestroCol = collection(this.firestore, "Usuario");
    const Query = query(MaestroCol,
      where("TipoUsuario", "==", "Maestro"),
      where("Materias", "array-contains", this.Materias[this.materiaRegular].IdMateria)
    );

    collectionData(Query).subscribe((snapMaestros) => {
      for (let i = 0; i < snapMaestros.length; i++) {
        this.MaestrosRegulares[i] = new Usuario();
        this.MaestrosRegulares[i].setData(snapMaestros[i]);
      }
    });

    (document.getElementById('disabledSelect3') as HTMLInputElement).disabled = false;
  }

  obtenerMaestrosI() {
    this.MaestrosIrregulares = new Array();

    const MaestroCol = collection(this.firestore, "Usuario");
    const Query = query(MaestroCol,
      where("TipoUsuario", "==", "Maestro"),
      where("Materias", "array-contains", this.Materias[this.materiaIrregular].IdMateria)
    );

    collectionData(Query).subscribe((snapMaestros) => {
      for (let i = 0; i < snapMaestros.length; i++) {
        this.MaestrosIrregulares[i] = new Usuario();
        this.MaestrosIrregulares[i].setData(snapMaestros[i]);
      }
    });

    (document.getElementById('maestroI') as HTMLInputElement).disabled = false;
  }

  obtenerHoras() {
    const horas = this.Materias[this.materiaRegular].Horas;
    this.HorasMateria = horas;
    this.HorasDisponibles = horas;
  }

  obtenerHorasI() {
    const horas = this.Materias[this.materiaIrregular].Horas;
    this.HorasMateriaIrregular = horas;
    this.HorasDisponiblesIrregular = horas;
  }

  buscarMaestro() {
    if (this.maestroRegular != "" && this.materiaRegular > -1) {
      this.DisponibilidadRegular = new DisponibilidadMaestro();

      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol,
        where("Nombre", "==", this.maestroRegular),
        where("Ciclo", "==", this.Horario.Ciclo)
      );

      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (snapDisponibilidad.length > 0) {
          this.DisponibilidadRegular.setData(snapDisponibilidad[0]);
        }
      });
    } else {
      this.horarioRegularHabilitado = false;
    }
  }

  buscarMaestroI() {
    if (this.maestroIrregular != "" && this.materiaIrregular > -1) {
      this.DisponibilidadIrregular = new DisponibilidadMaestro();

      const DisponibilidadCol = collection(this.firestore, "DisponibilidadMaestro");
      const Query = query(DisponibilidadCol,
        where("Nombre", "==", this.maestroIrregular),
        where("Ciclo", "==", this.Horario.Ciclo)
      );

      collectionData(Query).subscribe((snapDisponibilidad) => {
        if (snapDisponibilidad.length > 0) {
          this.DisponibilidadIrregular.setData(snapDisponibilidad[0]);
        }
      });
    } else {
      this.horarioIrregularHabilitado = false;
    }
  }

  resaltarMaestro() {
    if (this.Horario.Ciclo == "" || this.Horario.Carrera == "" || this.Horario.Periodo == "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Faltan Campos',
        text: 'Favor de llenar los campos de Ciclo, Carrera y Periodo.'
      });
      return;
    }

    if (this.maestroRegular == "") {
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

    for (let i = 0; i < disponibilidadDocente.length; i++) {
      for (let j = 0; j < disponibilidadDocente[i].registro.length; j++) {
        if ((disponibilidadDocente[i].registro[j].disponible || horario[i].registro[j].maestro == this.maestroRegular)
          && horario[i].registro[j].maestro != "INGLÉS") {
          document.getElementById(`c${i}${j}r`)?.classList.add('dato-agregado');
        } else if (document.getElementById(`c${i}${j}r`)?.classList.contains('dato-agregado')) {
          document.getElementById(`c${i}${j}r`)?.classList.remove('dato-agregado');
        }

        //Provisional
        if (horario[i].registro[j].texto == this.Materias[this.materiaRegular].Nombre) {
          this.HorasDisponibles--;
        }
      }
    }

    this.horarioRegularHabilitado = true;

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Disponibilidad cargada!',
      showConfirmButton: false,
      timer: 1200
    });
  }

  resaltarMaestroI() {
    if (this.Horario.Ciclo != "" && this.Horario.Carrera != "" && this.Horario.Periodo != "") {
      if (this.maestroIrregular != "") {
        if (this.DisponibilidadIrregular.IdDisponibilidad != "") {
          for (let i = 0; i < this.DisponibilidadIrregular.Disponibilidad.length; i++) {
            for (let j = 0; j < this.DisponibilidadIrregular.Disponibilidad[i].registro.length; j++) {
              if (this.DisponibilidadIrregular.Disponibilidad[i].registro[j].disponible ||
                this.Horario.HorarioIrregular[i].registro[j].maestro == this.maestroIrregular) {
                document.getElementById(`c${i}${j}i`)?.classList.add('dato-agregado');
              } else if (document.getElementById(`c${i}${j}i`)?.classList.contains('dato-agregado')) {
                document.getElementById(`c${i}${j}i`)?.classList.remove('dato-agregado');
              }

              //Provisional
              if (this.Horario.HorarioIrregular[i].registro[j].texto == this.Materias[this.materiaIrregular].Nombre) {
                this.HorasDisponiblesIrregular--;
              }
            }
          }

          this.horarioIrregularHabilitado = true;

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Disponibilidad cargada!',
            showConfirmButton: false,
            timer: 1200
          });
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Este usuario no tiene una disponibilidad registrada para el ciclo seleccionado.',
            showConfirmButton: true
          });
        }
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

  iniciarRegular(iniciar: boolean) {
    (document.getElementById('carrera') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('ciclo') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('periodo') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('buscar') as HTMLButtonElement).disabled = iniciar;

    (document.getElementById('disabledSelect2') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('disabledSelect3') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('cargar') as HTMLButtonElement).disabled = iniciar;
  }

  iniciarIrregular(iniciar: boolean) {
    (document.getElementById('carrera') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('ciclo') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('periodo') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('buscar') as HTMLButtonElement).disabled = iniciar;

    (document.getElementById('materiaI') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('maestroI') as HTMLInputElement).disabled = iniciar;
    (document.getElementById('cargarI') as HTMLButtonElement).disabled = iniciar;
  }

  openSwalModalR(i: number, j: number) {
    if (this.horarioRegularHabilitado) {
      const materiaSeleccionada = this.Materias[this.materiaRegular].Nombre;
      const celda = document.getElementById(`c${i}${j}r`);
      let registro = this.Horario.HorarioRegular[i].registro[j];

      if (registro.maestro == "INGLÉS") {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Horario de Inglés',
          text: 'No se puede modificar el horario de inglés.'
        });
        return;
      }

      if ((celda?.classList.contains('dato-agregado') && this.HorasDisponibles > 0) || registro.texto == materiaSeleccionada) {
        const maestroSeleccionado = this.maestroRegular;

        Swal.fire({
          title: 'Ingrese el Aula',
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
          const valorAnterior = registro.salon;

          if (result.isConfirmed) {
            if (valor3 != "") {
              registro.salon = "Aula: " + valor3;
              registro.maestro = maestroSeleccionado;
              registro.texto = materiaSeleccionada;
              this.DisponibilidadRegular.Disponibilidad[i].registro[j].disponible = false;
              if (valorAnterior != valor3) {
                this.HorasDisponibles--;
              }
            } else {
              Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Debe insertar un número de salón.',
                showConfirmButton: true
              });
            }
          }
          if (result.isDenied && registro.salon != "") {
            registro.salon = "";
            registro.maestro = "";
            registro.texto = "";
            this.DisponibilidadRegular.Disponibilidad[i].registro[j].disponible = true;
            this.HorasDisponibles++;
          }

          this.Horario.HorarioRegular[i].registro[j] = registro;

          if (this.HorasDisponibles < this.HorasMateria && this.HorasDisponibles > 0) {
            this.iniciarRegular(true);
          } else if (this.HorasDisponibles == this.HorasMateria) {
            this.iniciarRegular(false);
          }
        });
      } else if (celda?.classList.contains('dato-agregado') == false) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Este docente no se encuentra disponible a esta hora.',
          showConfirmButton: true
        });
      } else if (this.HorasDisponibles == 0) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Alcanzó el límite de horas de la materia.',
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
    if (this.horarioIrregularHabilitado) {
      const materiaSeleccionada = this.Materias[this.materiaIrregular].Nombre;

      if ((document.getElementById(`c${i}${j}i`)?.classList.contains('dato-agregado') && this.HorasDisponiblesIrregular > 0) ||
        (this.Horario.HorarioIrregular[i].registro[j].texto == materiaSeleccionada)) {
        const maestroSeleccionado = this.maestroIrregular;

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
          const valorAnterior = this.Horario.HorarioIrregular[i].registro[j].salon;

          if (result.isConfirmed) {
            if (valor3 != "") {
              this.Horario.HorarioIrregular[i].registro[j].salon = "Salón: " + valor3;
              this.Horario.HorarioIrregular[i].registro[j].maestro = maestroSeleccionado;
              this.Horario.HorarioIrregular[i].registro[j].texto = materiaSeleccionada;
              this.DisponibilidadIrregular.Disponibilidad[i].registro[j].disponible = false;
              if (valorAnterior != valor3) {
                this.HorasDisponiblesIrregular--;
              }
            } else {
              Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Debe insertar un número de salón.',
                showConfirmButton: true
              });
            }
          }
          if (result.isDenied && this.Horario.HorarioIrregular[i].registro[j].salon != "") {
            this.Horario.HorarioIrregular[i].registro[j].salon = "";
            this.Horario.HorarioIrregular[i].registro[j].maestro = "";
            this.Horario.HorarioIrregular[i].registro[j].texto = "";
            this.DisponibilidadIrregular.Disponibilidad[i].registro[j].disponible = true;
            this.HorasDisponiblesIrregular++;
          }

          if (this.HorasDisponiblesIrregular < this.HorasMateriaIrregular && this.HorasDisponiblesIrregular > 0) {
            this.iniciarIrregular(true);
          } else if (this.HorasDisponiblesIrregular == this.HorasMateriaIrregular) {
            this.iniciarIrregular(false);
          }
        });
      } else if (document.getElementById(`c${i}${j}i`)?.classList.contains('dato-agregado') == false) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Este docente no se encuentra disponible a esta hora.',
          showConfirmButton: true
        });
      } else if (this.HorasDisponiblesIrregular == 0) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Alcanzó el límite de horas de la materia.',
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

  guardarDisponibilidad() {
    let rutaDoc = doc(this.firestore, "DisponibilidadMaestro", this.DisponibilidadRegular.IdDisponibilidad);
    setDoc(rutaDoc, JSON.parse(JSON.stringify(this.DisponibilidadRegular)));
  }

  guardarDisponibilidadI() {
    let rutaDoc = doc(this.firestore, "DisponibilidadMaestro", this.DisponibilidadIrregular.IdDisponibilidad);
    setDoc(rutaDoc, JSON.parse(JSON.stringify(this.DisponibilidadIrregular)));
  }

  guardarHorario() {
    if (this.horarioRegularHabilitado) {
      if (this.HorasDisponibles == this.HorasMateria) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'No hay cambios recientes.',
          showConfirmButton: true
        });
        return;
      }

      if (this.HorasDisponibles < this.HorasMateria && this.HorasDisponibles > 0) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Cambios en Progreso.',
          text: 'Debe completar la asignación de horario antes de poder guardar.',
          showConfirmButton: true
        });
        return;
      }

      if (this.HorasDisponibles == 0) {
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
            let rutaDoc = doc(this.firestore, "Horario", this.Horario.IdHorario);

            if (this.nuevoHorario) {
              setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Horario)));
              this.nuevoHorario = false;
            } else {
              let data = {
                HorarioRegular: this.Horario.HorarioRegular
              };
              updateDoc(rutaDoc, data);
            }

            this.guardarDisponibilidad();
            this.iniciarRegular(false);

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
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Aún no se ha cargado una disponibilidad.',
        showConfirmButton: true
      });
    }
  }

  guardarHorarioI() {
    if (this.horarioIrregularHabilitado) {
      if (this.HorasDisponiblesIrregular == this.HorasMateriaIrregular) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'No hay cambios recientes.',
          showConfirmButton: true
        });
        return;
      }

      if (this.HorasDisponiblesIrregular < this.HorasMateriaIrregular && this.HorasDisponiblesIrregular > 0) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Cambios en Progreso.',
          text: 'Debe completar la asignación de horario antes de poder guardar.',
          showConfirmButton: true
        });
        return;
      }

      if (this.HorasDisponiblesIrregular == 0) {
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
            let rutaDoc = doc(this.firestore, "Horario", this.Horario.IdHorario);

            if (this.nuevoHorario) {
              setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Horario)));
              this.nuevoHorario = false;
            } else {
              let data = {
                HorarioIrregular: this.Horario.HorarioIrregular
              };
              updateDoc(rutaDoc, data);
            }

            this.guardarDisponibilidadI();
            this.iniciarIrregular(false);

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
}
