import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {
  @Input() etiquetas: Array<string>;
  @Input() datos: Array<number>;
  @Input() tipo: string;
  @Input() leyenda: string;

  constructor() { }

  ngOnInit() {
  }

}
