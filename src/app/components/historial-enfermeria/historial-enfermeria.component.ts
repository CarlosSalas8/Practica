import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Enfermeria } from 'src/app/interfaces/enfermeria';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-historial-enfermeria',
  templateUrl: './historial-enfermeria.component.html',
  styleUrls: ['./historial-enfermeria.component.css']
})
export class HistorialEnfermeriaComponent implements OnInit {
  

  @Input() usuario!: Enfermeria;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService, private router: Router) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.sharedService.cedulaSeleccionada$.subscribe(cedula => {
      if (cedula) {
        this.mostrarDatosEnfermeriaID(cedula);
      }
    });
  }

  mostrarDatosEnfermeriaID(cedula: string) {
    this.items = this.firestore.collection('enfermeria').valueChanges();
    // Suponiendo que cedula es única, encuentra al usuario con la cedula correspondiente
    this.items.subscribe(data => {
      this.userData = data.find(user => user.cedula === cedula);
      console.log('UserData:', this.userData);
    });
  }

  seleccionarUsuario(usuario: Enfermeria) {
    this.sharedService.actualizarCedula(usuario.cedula);
    this.usuario = usuario; // Update the usuario property
    this.mostrarDatosEnfermeriaID(usuario.cedula); // Llamada adicional si quieres actualizar los datos inmediatamente
  }

  revisarUsuario(cedula: any) {
    this.sharedService.actualizarCedula(cedula)
    console.log(cedula);
    this.router.navigate(['/list-enfermeria', { usuario: cedula }]);
  }
}