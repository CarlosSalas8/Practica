import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  typesOfShoes: string[] = ['E039', 'E10-E11', 'E66', 'E785-E780-E781-E782', 'I10', 'I21-I64', 'N188', 'Z108 (Control general de salud de rutina de residentes de instituciones)'];
  isOtherSelected: boolean = false;
  otherOption: string = '';
  inicio: FormGroup; // Declarar form como un FormGroup
  submitted = false;

  /*
  onSelectionChange(event: any) {
    this.isOtherSelected = event.source.selectedOptions.selected.some((option: { value: string; }) => option.value === 'Otros');
  }
  */
  constructor(private fb: FormBuilder, private _sharedService: SharedService, private router: Router, private _snackBar: MatSnackBar) {
    this.inicio = this.fb.group({
      cedula: ['', Validators.required],
      mujer: ['', Validators.required],
      enfermedades: ['', Validators.required],
      hipotirodismo: ['', Validators.required],
      diabetes: ['', Validators.required],
      cronica: ['', Validators.required],
      cancer: ['', Validators.required],
      obesidad: ['', Validators.required],
      dislipidemias: ['', Validators.required],
      personales: ['', Validators.required],
      otros: ['', Validators.required],
      valoracion: ['', Validators.required],
      cie10: [[]],
      otrosSelect: ['']
    });
  }


  agregarInicio() {
    this.submitted = true;

    if (this.inicio.invalid) {
      return
    }
    const formatearFecha = (fecha: Date) => format(fecha, 'dd/MM/yyyy');

    const datosInicio: any = {
      cedula: this.inicio.value.cedula,
      mujer: this.inicio.value.mujer,
      enfermedades: this.inicio.value.enfermedades,
      hipotirodismo: this.inicio.value.hipotirodismo,
      diabetes: this.inicio.value.diabetes,
      cronica: this.inicio.value.cronica,
      cancer: this.inicio.value.cancer,
      obesidad: this.inicio.value.obesidad,
      dislipidemias: this.inicio.value.dislipidemias,
      personales: this.inicio.value.personales,
      otros: this.inicio.value.otros,
      valoracion: this.inicio.value.valoracion,
      cie10: this.inicio.value.cie10,
      fechaIngreso: formatearFecha(new Date()),
      fechaUltima: formatearFecha(new Date()),
    }

    // Agregar otrosSelect solo si tiene valor
    if (this.inicio.value.otrosSelect.trim() !== '') {
      datosInicio.otrosSelect = this.inicio.value.otrosSelect;
    }

    this._sharedService.getDatosConsulta(datosInicio).then(() => {
      console.log('datos registrados con exito!')
      this.mostrarSnackbar('Datos guardados con éxito');
      this.router.navigate(['/principal-consulta']);
    }).catch(error => {
      console.log(error);
    })

  }

  onCie10SelectionChange(event: MatSelectionListChange): void {
    const selectedOptions = event.source.selectedOptions.selected.map(option => option.value);
    this.inicio.patchValue({ cie10: selectedOptions });
  }


  mostrarSnackbar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000, // Duración en milisegundos
    });
  }



















}
