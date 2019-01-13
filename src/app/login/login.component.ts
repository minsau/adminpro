import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe = false;
  email = '';
  auth2: any;
  constructor(
    private _user: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 0) {
      this.rememberMe = true;
    }
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '155359279435-ncvmii6q6ckt6uttrlj341l05bobcfud.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });
      this.attachSignIn(document.getElementById('btn-google'));
    });
  }

  attachSignIn (element: HTMLElement) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;
      this._user.loginGoogle(token).subscribe((response: any) => {
        if(response) {
          this.router.navigate(['/dashboard']);
        }
      });
    });
  }

  login(loginForm: NgForm) {
    if(loginForm.invalid) {
      return;
    }

    const user = new User(
      null,
      loginForm.value.email,
      loginForm.value.password
    );

    this._user.login(user, loginForm.value.rememberMe).subscribe(
      response => {
        if(response) {
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

}
