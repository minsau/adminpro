import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  constructor(
    private __usuario: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.formRegister = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      terms: new FormControl(false)
    }, { validators: this.verifyPasswords('password', 'password2')});

    this.formRegister.setValue({
      name: 'Saúl',
      email: 'minsau3@gmail.com',
      password: 'azzul94S',
      password2: 'azzul94S',
      terms: true
    });
  }

  verifyPasswords(field1, field2) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;
      if(pass1 === pass2) {
        return null
      }
      return {
        notEqual: true
      }
    }
  }

  userRegister() {
    if(this.formRegister.invalid){
      return ;
    }

    if(!this.formRegister.value.terms){
      swal('Importante', 'Debe aceptar los Terminos y condiciones', 'warning');
      return ;
    }
    const user = new User(
      this.formRegister.value.name,
      this.formRegister.value.email,
      this.formRegister.value.password
    );

    this.__usuario.createUsuario(user).subscribe(resp => {
      this.router.navigate(['/login'])
    });
  }

}
