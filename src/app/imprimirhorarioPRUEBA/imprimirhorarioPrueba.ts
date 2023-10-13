import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from 'src/app/database/database';
import jsPDF from 'jspdf';
import { Firestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { collection, query, where, collectionData } from "@angular/fire/firestore";


@Component({
  selector: 'imprimirhorarioPrueba.',
  templateUrl: './imprimirhorarioPrueba.html',
  styleUrls: ['./imprimihorarioPrueba.css']
})
export class imprimirhorarioPruebaComponent {
//   Usuario : Usuario = new Usuario();

//   constructor(public router: Router) { }

//   navigate(route: string) {
//     this.router.navigate([route], { state: this.Usuario });
//   }

  @ViewChild('content', {static:false}) el!: ElementRef
  title = 'GeneradorPDF';

  GPDF(){
    let pdf = new jsPDF()

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("Prueba.pdf")
      }
    })
  }

  Usuario : Usuario = new Usuario();
  constructor(private firestore: Firestore, public router: Router) { }

  getUsuario() {
    const user = collection(this.firestore, "Usuario");
    const q = query(user,
        where("NombreUsuario", "==", "Prueba1"),
    );

    collectionData(q).subscribe((snapUser) => {
      this.Usuario.setData(snapUser[0])
    });
}

}