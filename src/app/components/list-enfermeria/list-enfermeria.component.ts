import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Enfermeria } from 'src/app/interfaces/enfermeria';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-enfermeria',
  templateUrl: './list-enfermeria.component.html',
  styleUrls: ['./list-enfermeria.component.css']
})
export class ListEnfermeriaComponent implements OnInit {

  @Input() usuario!: Enfermeria;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.sharedService.cedulaSeleccionada$.subscribe(cedula => {
      if (cedula) {
        const formularioSeleccionado = history.state.formulario;
        this.mostrarDatosEnfermeriaID(cedula, formularioSeleccionado);
      }
    });
  }

  mostrarDatosEnfermeriaID(cedula: string, formularioSeleccionado: any) {
    this.items = this.firestore.collection('enfermeria').valueChanges();
    // Suponiendo que cedula es única, encuentra todos los formularios relacionados con la cédula correspondiente
    this.items.subscribe(data => {
      // Filtra todos los formularios relacionados con la cédula
      const formularios = data.filter(user => user.cedula === cedula);
      console.log('Formularios del usuario:', formularios);
      // Verifica si se ha seleccionado un formulario específico
      if (formularioSeleccionado) {
        // Busca el formulario seleccionado por el usuario
        const formulario = formularios.find(form => form.id === formularioSeleccionado.id && form.fechaIngreso === formularioSeleccionado.fechaIngreso);
        if (formulario) {
          this.userData = formulario;
          console.log('UserData:', this.userData);
        } else {
          console.log('El formulario seleccionado no coincide con los formularios del usuario.');
        }
      } else {
        // Si no se ha seleccionado un formulario específico, muestra el primer formulario encontrado
        if (formularios.length > 0) {
          this.userData = formularios[0];
          console.log('UserData:', this.userData);
          console.log('VALE VRG:');
        } else {
          console.log('No se encontraron formularios para este usuario.');
        }
      }
    });
  }

  
}
