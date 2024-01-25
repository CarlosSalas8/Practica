import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],

})

export class InicioComponent {
  inicio: FormGroup; // Declarar inicio como un FormGroup
  submitted = false;
  selected: Date | null | undefined;


  constructor(private fb: FormBuilder, private _sharedService: SharedService, private router: Router,private _snackBar: MatSnackBar) {
    this.inicio = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      atencion: ['', Validators.required],
      afiliacion: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: [''],
      estado: ['', Validators.required],
      laboral: ['', Validators.required],
      parroquia: ['', Validators.required],
      calles: ['', Validators.required],
      numcasa: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      escolaridad: ['', Validators.required],
      institucion: ['', Validators.required],
      ocupacion: ['', Validators.required],
      guia: ['', Validators.required],
      alimentacion: ['', Validators.required],
      fumar: ['', Validators.required],
      sustancias: ['', Validators.required],
      ejercicio: ['', Validators.required],
      alcoholismo: ['', Validators.required],
      antecedentes: ['', Validators.required],
      diabetes: ['', Validators.required],
      patologia: ['', Validators.required],
      cancer: ['', Validators.required],
      tiroidea: ['', Validators.required],
      sobrepeso: ['', Validators.required],
      otros: ['', Validators.required],

    })

  }

  onDateChange(selectedDate: Date): void {
    // Update the form control value when the date changes
    this.inicio.get('fechaNacimiento')?.setValue(selectedDate);
  }


  agregarInicio() {
    this.submitted = true;

    if (this.inicio.invalid) {
      return
    }
    const formatearFecha = (fecha: Date) => format(fecha, 'dd/MM/yyyy');

    const datosInicio: any = {
      cedula: this.inicio.value.cedula,
      nombre: this.inicio.value.nombre,
      atencion: this.inicio.value.atencion,
      afiliacion: this.inicio.value.afiliacion,
      sexo: this.inicio.value.sexo,
      edad: this.inicio.value.edad,
      fechaNacimiento: formatearFecha(this.inicio.value.fechaNacimiento),
      estado: this.inicio.value.estado,
      laboral: this.inicio.value.laboral,
      parroquia: this.inicio.value.parroquia,
      calles: this.inicio.value.calles,
      numcasa: this.inicio.value.numcasa,
      telefono: this.inicio.value.telefono,
      mail: this.inicio.value.mail,
      escolaridad: this.inicio.value.escolaridad,
      institucion: this.inicio.value.institucion,
      ocupacion: this.inicio.value.ocupacion,
      guia: this.inicio.value.guia,
      alimentacion: this.inicio.value.alimentacion,
      fumar: this.inicio.value.fumar,
      sustancias: this.inicio.value.sustancias,
      ejercicio: this.inicio.value.ejercicio,
      alcoholismo: this.inicio.value.alcoholismo,
      antecedentes: this.inicio.value.antecedentes,
      diabetes: this.inicio.value.diabetes,
      patologia: this.inicio.value.patologia,
      cancer: this.inicio.value.cancer,
      tiroidea: this.inicio.value.tiroidea,
      sobrepeso: this.inicio.value.sobrepeso,
      otros: this.inicio.value.otros,

      fechaIngreso: formatearFecha(new Date()),
      fechaUltima: formatearFecha(new Date()),
    }

    this._sharedService.getDatosGenerales(datosInicio).then(() => {
      console.log('datos registrados con exito!')
      this.mostrarSnackbar('Datos guardados con éxito');
      this.router.navigate(['/pagina-principal']);
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