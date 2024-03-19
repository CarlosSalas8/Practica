import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css']
})
export class EnfermeriaComponent {
  inicio: FormGroup; // Declarar inicio como un FormGroup
  submitted = false;

  constructor(private fb: FormBuilder, private _sharedService: SharedService, private router: Router, private _snackBar: MatSnackBar) {
    this.inicio = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      peso: ['', Validators.required],
      talla: ['', Validators.required],
      cintura: ['', Validators.required],
      presion: ['', Validators.required],
    })
  }

  agregarInicio() {

    this.submitted = true;

    if (this.inicio.invalid) {
      return
    }
    // Obtener el contador de localStorage o inicializarlo en 1 si no existe
    let contador = localStorage.getItem('formularioContador');
    if (!contador) {
      contador = '1';
    } else {
      contador = (parseInt(contador) + 1).toString();
    }
    const formatearFecha = (fecha: Date) => format(fecha, 'dd/MM/yyyy');

    const datosInicio: any = {
      cedula: this.inicio.value.cedula,
      nombre: this.inicio.value.nombre,
      peso: this.inicio.value.peso,
      talla: this.inicio.value.talla,
      cintura: this.inicio.value.cintura,
      presion: this.inicio.value.presion,
      fechaIngreso: formatearFecha(new Date()),
      fechaUltima: formatearFecha(new Date()),
      numeroUnico: contador
    }

    localStorage.setItem('formularioContador', contador);

    this._sharedService.getDatosEnfermeria(datosInicio).then(() => {
      console.log('datos registrados con exito!')
      this.mostrarSnackbar('Datos guardados con éxito');
      this.router.navigate(['/principal-enfermeria']);
    }).catch(error => {
      console.log(error);
    })

  }

  mostrarSnackbar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000, // Duración en milisegundos
    });
  }
}  
