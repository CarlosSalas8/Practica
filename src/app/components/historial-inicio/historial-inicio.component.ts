import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-historial-inicio',
  templateUrl: './historial-inicio.component.html',
  styleUrls: ['./historial-inicio.component.css']
})
export class HistorialInicioComponent implements OnInit {
  

  @Input() usuario!: Usuario;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService, private router: Router) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.sharedService.cedulaSeleccionada$.subscribe(cedula => {
      if (cedula) {
        this.mostrarDatosGeneralesID(cedula);
      }
    });
  }

  mostrarDatosGeneralesID(cedula: string) {
    this.items = this.firestore.collection('datosGenerales').valueChanges();
    // Suponiendo que cedula es única, encuentra al usuario con la cedula correspondiente
    this.items.subscribe(data => {
      this.userData = data.find(user => user.cedula === cedula);
      console.log('UserData:', this.userData);
    });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.sharedService.actualizarCedula(usuario.cedula);
    this.usuario = usuario; // Update the usuario property
    this.mostrarDatosGeneralesID(usuario.cedula); // Llamada adicional si quieres actualizar los datos inmediatamente
  }

  revisarUsuario(cedula: any) {
    this.sharedService.actualizarCedula(cedula)
    console.log(cedula);
    this.router.navigate(['/list-inicio', { usuario: cedula }]);
  }
}