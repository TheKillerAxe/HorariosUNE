import { Component, OnInit } from '@angular/core';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, getStorage } from 'firebase/storage';

@Component({
  selector: 'app-imprimirhorario',
  templateUrl: './imprimirhorario.component.html',
  styleUrls: ['./imprimirhorario.component.css']
})
export class ImprimirhorarioComponent {
  Ciclo: string = "";
  Carrera: string = "";
  Periodo: string = "";
  Docente: string = "";

  constructor(private fireStorage:Storage) { }

  buscarHorario() {
    let ruta = `${this.Ciclo}-${this.Carrera}-${this.Periodo}.pdf`;
    const storage = getStorage();

    getDownloadURL(ref(storage, ruta)).then((url)=>{
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => { const blob = xhr.response };
      xhr.open('GET', url);
      xhr.send();
    });
  }
}
