import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    const obs = new Observable( observer => {
      let contador = 1;
      const interval = setInterval( () => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(contador);
        }
      }, 1000);
    });
    
    obs.subscribe( numero => console.log('​RxjsComponent -> constructor -> numero', numero));
   }

  ngOnInit() {
  }

}
