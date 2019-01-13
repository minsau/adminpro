import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {
  api = environment.api_url;
  transform(img: string, type: string = 'user'): any {
    const images = this.api + '/img';
    if(!img) {
      return images + '/not_found.jpg';
    }

    if(img.indexOf('https') !== -1){
      return img;
    }

    switch(type){
      case 'user':
        return `${images}/usuarios/${img}`;
      case 'doctor':
        return `${images}/medicos/${img}`;
      case 'hospital':
        return `${images}/hospitales/${img}`;
      
      default:
        return images + '/not_found.jpg';
    } 
  }

}
