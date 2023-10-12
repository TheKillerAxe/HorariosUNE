import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horarios2',
  templateUrl: './horarios2.component.html',
  styleUrls: ['./horarios2.component.css']
})
export class Horarios2Component implements OnInit {

  horario: any[] = new Array()
  

  constructor() {
   this.horario[0]=[{}]
   this.horario[1]=[{}]
   this.horario[2]=[{}]
   this.horario[3]=[{}]
   this.horario[4]=[{}]
   this.horario[5]=[{}]
   this.horario[6]=[{}]

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
    this.horario[0][12]= {texto: "7:00"}
    this.horario[0][13]= {texto: "8:00"}
    this.horario[0][14]= {texto: "9:00"}
    this.horario[0][15]= {texto: "10:00"}

    this.horario[1][0]= {
                          maestro: "Camila",
                          texto: "Aplicaciones Moviles",
                          salon: "2.5"
                        }
    this.horario[1][1]= {texto: ""}
    this.horario[1][2]= {texto: ""}
    this.horario[1][3]= {texto: ""}
    this.horario[1][4]= {texto: ""}
    this.horario[1][5]= {texto: ""}
    this.horario[1][6]= {texto: ""}
    this.horario[1][7]= {texto: ""}
    this.horario[1][8]= {texto: ""}
    this.horario[1][9]= {texto: ""}
    this.horario[1][10]= {texto: ""}
    this.horario[1][11]= {texto: ""}
    this.horario[1][12]= {texto: ""}
    this.horario[1][13]= {texto: ""}
    this.horario[1][14]= {texto: ""}
    this.horario[1][15]= {texto: ""}

    this.horario[2][0]= {texto: ""}
    this.horario[2][1]= {texto: ""}
    this.horario[2][2]= {texto: ""}
    this.horario[2][3]= {texto: ""}
    this.horario[2][4]= {texto: ""}
    this.horario[2][5]= {texto: ""}
    this.horario[2][6]= {texto: ""}
    this.horario[2][7]= {texto: ""}
    this.horario[2][8]= {texto: ""}
    this.horario[2][9]= {texto: ""}
    this.horario[2][10]= {texto: ""}
    this.horario[2][11]= {texto: ""}
    this.horario[2][12]= {texto: ""}
    this.horario[2][13]= {texto: ""}
    this.horario[2][14]= {texto: ""}
    this.horario[2][15]= {texto: ""}

    this.horario[3][0]= {texto: ""}
    this.horario[3][1]= {texto: ""}
    this.horario[3][2]= {texto: ""}
    this.horario[3][3]= {texto: ""}
    this.horario[3][4]= {texto: ""}
    this.horario[3][5]= {texto: ""}
    this.horario[3][6]= {texto: ""}
    this.horario[3][7]= {texto: ""}
    this.horario[3][8]= {texto: ""}
    this.horario[3][9]= {texto: ""}
    this.horario[3][10]= {texto: ""}
    this.horario[3][11]= {texto: ""}
    this.horario[3][12]= {texto: ""}
    this.horario[3][13]= {texto: ""}
    this.horario[3][14]= {texto: ""}
    this.horario[3][15]= {texto: ""}

    this.horario[4][0]= {texto: ""}
    this.horario[4][1]= {texto: ""}
    this.horario[4][2]= {texto: ""}
    this.horario[4][3]= {texto: ""}
    this.horario[4][4]= {texto: ""}
    this.horario[4][5]= {texto: ""}
    this.horario[4][6]= {texto: ""}
    this.horario[4][7]= {texto: ""}
    this.horario[4][8]= {texto: ""}
    this.horario[4][9]= {texto: ""}
    this.horario[4][10]= {texto: ""}
    this.horario[4][11]= {texto: ""}
    this.horario[4][12]= {texto: ""}
    this.horario[4][13]= {texto: ""}
    this.horario[4][14]= {texto: ""}
    this.horario[4][15]= {texto: ""}

    this.horario[5][0]= {texto: ""}
    this.horario[5][1]= {texto: ""}
    this.horario[5][2]= {texto: ""}
    this.horario[5][3]= {texto: ""}
    this.horario[5][4]= {texto: ""}
    this.horario[5][5]= {texto: ""}
    this.horario[5][6]= {texto: ""}
    this.horario[5][7]= {texto: ""}
    this.horario[5][8]= {texto: ""}
    this.horario[5][9]= {texto: ""}
    this.horario[5][10]= {texto: ""}
    this.horario[5][11]= {texto: ""}
    this.horario[5][12]= {texto: ""}
    this.horario[5][13]= {texto: ""}
    this.horario[5][14]= {texto: ""}
    this.horario[5][15]= {texto: ""}

    this.horario[6][0]= {texto: ""}
    this.horario[6][1]= {texto: ""}
    this.horario[6][2]= {texto: ""}
    this.horario[6][3]= {texto: ""}
    this.horario[6][4]= {texto: ""}
    this.horario[6][5]= {texto: ""}
    this.horario[6][6]= {texto: ""}
    this.horario[6][7]= {texto: ""}
    this.horario[6][8]= {texto: ""}
    this.horario[6][9]= {texto: ""}
    this.horario[6][10]= {texto: ""}
    this.horario[6][11]= {texto: ""}
    this.horario[6][12]= {texto: ""}
    this.horario[6][13]= {texto: ""}
    this.horario[6][14]= {texto: ""}
    this.horario[6][15]= {texto: ""}
   }

  ngOnInit(): void {
  }

}
