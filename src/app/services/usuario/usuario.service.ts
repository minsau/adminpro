import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  api = environment.api_url;
  user: User;
  token: string;
  constructor(public http: HttpClient, private router: Router) {
    this.loadStorage();
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login(user: User, rememberMe: boolean){
    if(rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = this.api + '/login';
    return this.http.post(url, user).pipe(map((response:any) => {
      this.saveStorage(response.id, response.token, response.usuario);
      return true;
    }))
  }

  loginGoogle(token: string){
    const url = this.api + '/login/google';
    return this.http.post(url, {token}).pipe(map((response:any) => {
      this.saveStorage(response.id, response.token, response.usuario);
      return true;
    }))
  }

  createUsuario(usuario: User) {
    const url = this.api + '/usuario';
    return this.http.post(url, usuario).pipe(map((response: any) => {
      swal('Usuario creado', response.usuario.email, 'success');
      return response.usuario;
    }));
  }

  loadStorage() {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
    }
  }

  isLoguedIn() {
    return this.token.length > 0;
  }

}
