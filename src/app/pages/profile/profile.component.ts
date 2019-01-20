import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private _user: UsuarioService) { }

  ngOnInit() {
    this.user = this._user.user;
  }

  saveForm(user: User) {
    this.user.nombre = user.name;
    if(!this.user.google) {
      this.user.email = user.email;
    }
    this._user.updateUser(this.user).subscribe(
      response => {
        this.user = response;
      }
    );
  }

}
