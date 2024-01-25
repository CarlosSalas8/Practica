import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css']
})
export class EnfermeriaComponent {
  inicio: FormGroup; // Declarar inicio como un FormGroup
  submitted = false;  

  constructor(private fb: FormBuilder, private afs: AngularFirestore){
    this.inicio = this.fb.group({
      cedula: ['', Validators.required],
      peso: ['', Validators.required],
      talla: ['', Validators.required],
      cintura: ['', Validators.required],
      presion: ['', Validators.required],
    })
  }
  
  agregarInicio() {
    if (this.inicio.valid) {
      // Obtén los datos del formulario
      const datosInicio = this.inicio.value;
  
      // Verifica que la cédula no esté vacía
      if (!datosInicio.cedula) {
        console.log('La cédula es obligatoria.');
        return;
      }
      // Usar la cédula como ID al agregar datos a la colección en Firestore
      this.afs.collection('enfermeria').doc(datosInicio.cedula).set(datosInicio)
        .then(() => {
          console.log('Documento agregado con ID: ', datosInicio.cedula);
          // Puedes hacer algo más aquí si es necesario
        })
        .catch((error) => {
          console.error('Error al agregar documento: ', error);
        });
  
    } else {
      console.log('Formulario no válido. Comprueba los campos requeridos.');
    }
  }
}  