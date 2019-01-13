import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: any;
  constructor(public _sidebar: SidebarService, private _user: UsuarioService) { }

  ngOnInit() {
    this.user = this._user.user;
  }

  logout() {
    this._user.logout();
  }

}
