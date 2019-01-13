import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private _user: UsuarioService) { }

  ngOnInit() {
    this.user = this._user.user;
  }

  logout() {
    this._user.logout();
  }

}
