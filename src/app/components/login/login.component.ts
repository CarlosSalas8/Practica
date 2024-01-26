import { Component } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { timeout } from 'rxjs';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup
  hide: boolean = true;
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  showProgressBar: boolean = false;



  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      pasword: ['', Validators.required]
    })

  }

  ingresar() {
    const usuario = this.form.value.usuario;
    const pasword = this.form.value.pasword;

    console.log(usuario);
    console.log(pasword);

    if (usuario == 'usuario' && pasword == '123') {
      // Redireccionar a 'inicio'
      this.fakeloading('inicio');
    } else if (usuario == 'usuario2' && pasword == '123') {
      // Redireccionar a 'enfermeria'
      this.fakeloading('enfermeria');
    } else if (usuario == 'usuario3' && pasword == '123') {
      // Redireccionar a 'consulta'
      this.fakeloading('consulta');
    } else {
      // Error: usuario o contraseña incorrectos
      this.error();
      this.form.reset();
    }
  }

  fakeloading(route: string) {
    this.showProgressBar = true;
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1500);
  }

  error() {
    this._snackBar.open('Usuario o contraseña no validos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }

}


