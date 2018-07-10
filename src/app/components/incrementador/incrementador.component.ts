import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input() porcentaje: number = 5;
  @Input() leyenda: string = 'Leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  @ViewChild('progress') progressInput: ElementRef;
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
    this.cambioValor.emit(this.porcentaje);
  }

  onChangeProcentaje( valor: number) {
    if (valor >= 100) {
      this.porcentaje = 100;
    } else if (valor <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = valor;
    }
    this.progressInput.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

}
