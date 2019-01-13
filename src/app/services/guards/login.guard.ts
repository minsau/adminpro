import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private _user: UsuarioService,
    private router: Router
  ){
  }
  canActivate(): boolean {
    if(this._user.isLoguedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
