import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios2',
  templateUrl: './horarios2.component.html',
  styleUrls: ['./horarios2.component.css']
})
export class Horarios2Component implements OnInit {
  horario: any[] = new Array()
  maestro = "";
  ciclo = "";
  periodo = "";
  materia = "";
  carrera = "";
  habilitarmateria: boolean = true;
  habilitarmaestro: boolean = false;
  celdasLlenadas: number = 0;
  cambiandoMateria: boolean = false;
  horario2: any[] = new Array()
  materiai = ""
  maestroi = ""
  habilitarmateriai: boolean = true;
  habilitarmaestroi: boolean = true;




  constructor() {
    this.horario[0] = [{}]
    this.horario[1] = [{}]
    this.horario[2] = [{}]
    this.horario[3] = [{}]
    this.horario[4] = [{}]
    this.horario[5] = [{}]
    this.horario[6] = [{}]

    this.horario[0][0] = { texto: "7:00" }
    this.horario[0][1] = { texto: "8:00" }
    this.horario[0][2] = { texto: "9:00" }
    this.horario[0][3] = { texto: "10:00" }
    this.horario[0][4] = { texto: "11:00" }
    this.horario[0][5] = { texto: "12:00" }
    this.horario[0][6] = { texto: "13:00" }
    this.horario[0][7] = { texto: "14:00" }
    this.horario[0][8] = { texto: "15:00" }
    this.horario[0][9] = { texto: "16:00" }
    this.horario[0][10] = { texto: "17:00" }
    this.horario[0][11] = { texto: "18:00" }
    this.horario[0][12] = { texto: "19:00" }
    this.horario[0][13] = { texto: "20:00" }
    this.horario[0][14] = { texto: "21:00" }
    this.horario[0][15] = { texto: "22:00" }

    this.horario[1][0] = {
      // maestro: "Camila",
      // texto: "Aplicaciones Moviles",
      // salon: "2.5"
    }
    this.horario[1][1] = { texto: "" }
    this.horario[1][2] = { texto: "" }
    this.horario[1][3] = { texto: "" }
    this.horario[1][4] = { texto: "" }
    this.horario[1][5] = { texto: "" }
    this.horario[1][6] = { texto: "" }
    this.horario[1][7] = { texto: "" }
    this.horario[1][8] = { texto: "" }
    this.horario[1][9] = { texto: "" }
    this.horario[1][10] = { texto: "" }
    this.horario[1][11] = { texto: "" }
    this.horario[1][12] = { texto: "" }
    this.horario[1][13] = { texto: "" }
    this.horario[1][14] = { texto: "" }
    this.horario[1][15] = { texto: "" }

    this.horario[2][0] = { texto: "" }
    this.horario[2][1] = { texto: "" }
    this.horario[2][2] = { texto: "" }
    this.horario[2][3] = { texto: "" }
    this.horario[2][4] = { texto: "" }
    this.horario[2][5] = { texto: "" }
    this.horario[2][6] = { texto: "" }
    this.horario[2][7] = { texto: "" }
    this.horario[2][8] = { texto: "" }
    this.horario[2][9] = { texto: "" }
    this.horario[2][10] = { texto: "" }
    this.horario[2][11] = { texto: "" }
    this.horario[2][12] = { texto: "" }
    this.horario[2][13] = { texto: "" }
    this.horario[2][14] = { texto: "" }
    this.horario[2][15] = { texto: "" }

    this.horario[3][0] = { texto: "" }
    this.horario[3][1] = { texto: "" }
    this.horario[3][2] = { texto: "" }
    this.horario[3][3] = { texto: "" }
    this.horario[3][4] = { texto: "" }
    this.horario[3][5] = { texto: "" }
    this.horario[3][6] = { texto: "" }
    this.horario[3][7] = { texto: "" }
    this.horario[3][8] = { texto: "" }
    this.horario[3][9] = { texto: "" }
    this.horario[3][10] = { texto: "" }
    this.horario[3][11] = { texto: "" }
    this.horario[3][12] = { texto: "" }
    this.horario[3][13] = { texto: "" }
    this.horario[3][14] = { texto: "" }
    this.horario[3][15] = { texto: "" }

    this.horario[4][0] = { texto: "" }
    this.horario[4][1] = { texto: "" }
    this.horario[4][2] = { texto: "" }
    this.horario[4][3] = { texto: "" }
    this.horario[4][4] = { texto: "" }
    this.horario[4][5] = { texto: "" }
    this.horario[4][6] = { texto: "" }
    this.horario[4][7] = { texto: "" }
    this.horario[4][8] = { texto: "" }
    this.horario[4][9] = { texto: "" }
    this.horario[4][10] = { texto: "" }
    this.horario[4][11] = { texto: "" }
    this.horario[4][12] = { texto: "" }
    this.horario[4][13] = { texto: "" }
    this.horario[4][14] = { texto: "" }
    this.horario[4][15] = { texto: "" }

    this.horario[5][0] = { texto: "" }
    this.horario[5][1] = { texto: "" }
    this.horario[5][2] = { texto: "" }
    this.horario[5][3] = { texto: "" }
    this.horario[5][4] = { texto: "" }
    this.horario[5][5] = { texto: "" }
    this.horario[5][6] = { texto: "" }
    this.horario[5][7] = { texto: "" }
    this.horario[5][8] = { texto: "" }
    this.horario[5][9] = { texto: "" }
    this.horario[5][10] = { texto: "" }
    this.horario[5][11] = { texto: "" }
    this.horario[5][12] = { texto: "" }
    this.horario[5][13] = { texto: "" }
    this.horario[5][14] = { texto: "" }
    this.horario[5][15] = { texto: "" }

    this.horario[6][0] = { texto: "" }
    this.horario[6][1] = { texto: "" }
    this.horario[6][2] = { texto: "" }
    this.horario[6][3] = { texto: "" }
    this.horario[6][4] = { texto: "" }
    this.horario[6][5] = { texto: "" }
    this.horario[6][6] = { texto: "" }
    this.horario[6][7] = { texto: "" }
    this.horario[6][8] = { texto: "" }
    this.horario[6][9] = { texto: "" }
    this.horario[6][10] = { texto: "" }
    this.horario[6][11] = { texto: "" }
    this.horario[6][12] = { texto: "" }
    this.horario[6][13] = { texto: "" }
    this.horario[6][14] = { texto: "" }
    this.horario[6][15] = { texto: "" }


    //----------------horario irregular----------------------

    this.horario2[0] = [{}]
    this.horario2[1] = [{}]
    this.horario2[2] = [{}]
    this.horario2[3] = [{}]
    this.horario2[4] = [{}]
    this.horario2[5] = [{}]
    this.horario2[6] = [{}]

    this.horario2[0][0] = { texto: "7:00" }
    this.horario2[0][1] = { texto: "8:00" }
    this.horario2[0][2] = { texto: "9:00" }
    this.horario2[0][3] = { texto: "10:00" }
    this.horario2[0][4] = { texto: "11:00" }
    this.horario2[0][5] = { texto: "12:00" }
    this.horario2[0][6] = { texto: "13:00" }
    this.horario2[0][7] = { texto: "14:00" }
    this.horario2[0][8] = { texto: "15:00" }
    this.horario2[0][9] = { texto: "16:00" }
    this.horario2[0][10] = { texto: "17:00" }
    this.horario2[0][11] = { texto: "18:00" }
    this.horario2[0][12] = { texto: "19:00" }
    this.horario2[0][13] = { texto: "20:00" }
    this.horario2[0][14] = { texto: "21:00" }
    this.horario2[0][15] = { texto: "22:00" }

    this.horario2[1][0] = {
      // maestro: "Camila",
      // texto: "Aplicaciones Moviles",
      // salon: "2.5"
    }
    this.horario2[1][1] = { texto: "" }
    this.horario2[1][2] = { texto: "" }
    this.horario2[1][3] = { texto: "" }
    this.horario2[1][4] = { texto: "" }
    this.horario2[1][5] = { texto: "" }
    this.horario2[1][6] = { texto: "" }
    this.horario2[1][7] = { texto: "" }
    this.horario2[1][8] = { texto: "" }
    this.horario2[1][9] = { texto: "" }
    this.horario2[1][10] = { texto: "" }
    this.horario2[1][11] = { texto: "" }
    this.horario2[1][12] = { texto: "" }
    this.horario2[1][13] = { texto: "" }
    this.horario2[1][14] = { texto: "" }
    this.horario2[1][15] = { texto: "" }

    this.horario2[2][0] = { texto: "" }
    this.horario2[2][1] = { texto: "" }
    this.horario2[2][2] = { texto: "" }
    this.horario2[2][3] = { texto: "" }
    this.horario2[2][4] = { texto: "" }
    this.horario2[2][5] = { texto: "" }
    this.horario2[2][6] = { texto: "" }
    this.horario2[2][7] = { texto: "" }
    this.horario2[2][8] = { texto: "" }
    this.horario2[2][9] = { texto: "" }
    this.horario2[2][10] = { texto: "" }
    this.horario2[2][11] = { texto: "" }
    this.horario2[2][12] = { texto: "" }
    this.horario2[2][13] = { texto: "" }
    this.horario2[2][14] = { texto: "" }
    this.horario2[2][15] = { texto: "" }

    this.horario2[3][0] = { texto: "" }
    this.horario2[3][1] = { texto: "" }
    this.horario2[3][2] = { texto: "" }
    this.horario2[3][3] = { texto: "" }
    this.horario2[3][4] = { texto: "" }
    this.horario2[3][5] = { texto: "" }
    this.horario2[3][6] = { texto: "" }
    this.horario2[3][7] = { texto: "" }
    this.horario2[3][8] = { texto: "" }
    this.horario2[3][9] = { texto: "" }
    this.horario2[3][10] = { texto: "" }
    this.horario2[3][11] = { texto: "" }
    this.horario2[3][12] = { texto: "" }
    this.horario2[3][13] = { texto: "" }
    this.horario2[3][14] = { texto: "" }
    this.horario2[3][15] = { texto: "" }

    this.horario2[4][0] = { texto: "" }
    this.horario2[4][1] = { texto: "" }
    this.horario2[4][2] = { texto: "" }
    this.horario2[4][3] = { texto: "" }
    this.horario2[4][4] = { texto: "" }
    this.horario2[4][5] = { texto: "" }
    this.horario2[4][6] = { texto: "" }
    this.horario2[4][7] = { texto: "" }
    this.horario2[4][8] = { texto: "" }
    this.horario2[4][9] = { texto: "" }
    this.horario2[4][10] = { texto: "" }
    this.horario2[4][11] = { texto: "" }
    this.horario2[4][12] = { texto: "" }
    this.horario2[4][13] = { texto: "" }
    this.horario2[4][14] = { texto: "" }
    this.horario2[4][15] = { texto: "" }

    this.horario2[5][0] = { texto: "" }
    this.horario2[5][1] = { texto: "" }
    this.horario2[5][2] = { texto: "" }
    this.horario2[5][3] = { texto: "" }
    this.horario2[5][4] = { texto: "" }
    this.horario2[5][5] = { texto: "" }
    this.horario2[5][6] = { texto: "" }
    this.horario2[5][7] = { texto: "" }
    this.horario2[5][8] = { texto: "" }
    this.horario2[5][9] = { texto: "" }
    this.horario2[5][10] = { texto: "" }
    this.horario2[5][11] = { texto: "" }
    this.horario2[5][12] = { texto: "" }
    this.horario2[5][13] = { texto: "" }
    this.horario2[5][14] = { texto: "" }
    this.horario2[5][15] = { texto: "" }

    this.horario2[6][0] = { texto: "" }
    this.horario2[6][1] = { texto: "" }
    this.horario2[6][2] = { texto: "" }
    this.horario2[6][3] = { texto: "" }
    this.horario2[6][4] = { texto: "" }
    this.horario2[6][5] = { texto: "" }
    this.horario2[6][6] = { texto: "" }
    this.horario2[6][7] = { texto: "" }
    this.horario2[6][8] = { texto: "" }
    this.horario2[6][9] = { texto: "" }
    this.horario2[6][10] = { texto: "" }
    this.horario2[6][11] = { texto: "" }
    this.horario2[6][12] = { texto: "" }
    this.horario2[6][13] = { texto: "" }
    this.horario2[6][14] = { texto: "" }
    this.horario2[6][15] = { texto: "" }
  }

  ngOnInit(): void {

  }



  openSwalModal(i: number, j: number) {
    this.habilitarmateria = true;
    this.habilitarmaestro = true;

    if (this.materia === '' || this.materia === null || this.maestro === '' || this.maestro === null) {
      Swal.fire('Por favor seleccione una materia y maestro antes de llenar las celdas.', '', 'warning');
      this.habilitarmateria = false;
      this.habilitarmaestro = false;
      return;
    }


    const materiaSeleccionada = this.materia;

    Swal.fire({
      title: 'Ingresa el salón',
      html: `<input id="valor3" class="swal2-input" placeholder="Salón" type="number">`,
      focusConfirm: false,
      preConfirm: () => {
        const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
        return { valor3 };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { valor3 } = result.value;

        this.horario[i][j].maestro = this.maestro;
        this.horario[i][j].salon = "Aula: " + valor3;
        this.horario[i][j].texto = materiaSeleccionada;

        this.celdasLlenadas++;

        const celda = document.getElementById(`c${i}${j}`);
        if (celda) {
          celda.classList.add('dato-agregado');
        }
      }
    });
  }

  openSwalModal2(i: number, j: number) {
    this.habilitarmateriai = true;
    this.habilitarmaestroi = true;

    if (this.materiai === '' || this.materiai === null || this.maestroi === '' || this.maestroi === null) {
      Swal.fire('Por favor seleccione una materia y maestro antes de llenar las celdas.', '', 'warning');
      return;
    }

    const materiaSeleccionada = this.materiai;

    Swal.fire({
      title: 'Ingresa el salón',
      html: `<input id="valor3" class="swal2-input" placeholder="Salón" type="number">`,
      focusConfirm: false,
      preConfirm: () => {
        const valor3 = (document.getElementById('valor3') as HTMLInputElement).value;
        return { valor3 };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { valor3 } = result.value;

        this.horario2[i][j].maestroi = this.maestroi;
        this.horario2[i][j].salon = "Aula: " + valor3;
        this.horario2[i][j].texto = materiaSeleccionada;

        this.celdasLlenadas++;

        const celda = document.getElementById(`ci${i}${j}`);
        if (celda) {
          celda.classList.add('dato-agregado');
        }
      }
    });
  }





  cambiosguardados() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 1500
    })
  }

  mostrarHorario: boolean = false;
  mostrarHorario2: boolean = false;
  mostrarHorario3: boolean = false;


  mostrarCodigoHorario() {
    this.mostrarHorario = !this.mostrarHorario;
  }
  mostrarCodigoHorario2() {
    this.mostrarHorario2 = !this.mostrarHorario2;
  }

  mostrarCodigoHorario3() {
    this.mostrarHorario3 = !this.mostrarHorario3;
  }

  ejecutarFunciones() {
    this.mostrarCodigoHorario();
    this.mostrarCodigoHorario2();
    this.mostrarCodigoHorario3();
  }

  materiasOriginales: string[] = ["Seminario de tecnologias", "Algebra", "Costos"];

  materiasDuplicadas: string[] = this.materiasOriginales;

  duplicarmaterias() {

    Swal.fire({
      icon: 'success',
      title: 'Materias divididas correctamente',
      showConfirmButton: false,
      timer: 1200
    })

    const materiasDuplicadasTemp: string[] = [];
    for (const materia of this.materiasOriginales) {
      materiasDuplicadasTemp.push(`${materia} (Grupo A)`);
      materiasDuplicadasTemp.push(`${materia} (Grupo B)`);
    }
    this.materiasDuplicadas = [...materiasDuplicadasTemp];
  }

  buscar() {
    if (this.carrera === '' || this.periodo === '' || this.ciclo === '') {
      Swal.fire('Por favor seleccione Carrera, Periodo y Ciclo', '', 'error');
    } else {
      this.habilitarmateria = false;
      this.habilitarmateriai = false;

    }
  }

  // maestrotoggle(){
  //   if(this.materia === "" || this.materia===null){
  //     this.habilitarmaestro = true;
  //   }else{
  //     this.habilitarmaestro = false;
  //   }
  // }

  maestroitoggle() {
    if (this.materiai === "" || this.materiai === null) {
      this.habilitarmaestroi = true;
    } else {
      this.habilitarmaestroi = false;
    }
  }

}
