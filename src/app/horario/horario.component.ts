import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horario: any = new Array()
  

  constructor() {
    this.horario[0] = [{}]
    this.horario[1] = [{}]
    this.horario[2] = [{}]
    this.horario[3] = [{}]
    this.horario[4] = [{}]
    this.horario[5] = [{}]
    this.horario[6] = [{}]

    this.horario[0][0]= {texto: "7:00"}
    this.horario[0][1]= {texto: "8:00"}
    this.horario[0][2]= {texto: "9:00"}
    this.horario[0][3]= {texto: "10:00"}
    this.horario[0][4]= {texto: "11:00"}
    this.horario[0][5]= {texto: "12:00"}
    this.horario[0][6]= {texto: "1:00"}
    this.horario[0][7]= {texto: "2:00"}
    this.horario[0][8]= {texto: "3:00"}
    this.horario[0][9]= {texto: "4:00"}
    this.horario[0][10]= {texto: "5:00"}
    this.horario[0][11]= {texto: "6:00"}

    this.horario[1][0]= {
                          maestro: "Camila",
                          texto: "Aplicaciones Moviles",
                          salon: "2.5"
                        }
    this.horario[1][1]= {texto: ""}
    this.horario[1][2]= {texto: "Alicaciones Moviles"}
   }

  ngOnInit(): void {
  }

}