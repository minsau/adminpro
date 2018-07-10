import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  porcentaje: number = 65;
  porcentaje2: number = 35;
  constructor() { }

  ngOnInit() {
  }

  cambiarValor( valor ) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    } 
    this.porcentaje += valor;
  }

}
