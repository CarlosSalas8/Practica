import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take, tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-inicio',
  templateUrl: './list-inicio.component.html',
  styleUrls: ['./list-inicio.component.css']
})
export class ListInicioComponent implements OnInit {

  @Input() usuario!: Usuario;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService) {
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
}