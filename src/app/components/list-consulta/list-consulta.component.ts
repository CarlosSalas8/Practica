import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/interfaces/consulta';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.component.html',
  styleUrls: ['./list-consulta.component.css']
})
export class ListConsultaComponent implements OnInit {

  @Input() usuario!: Consulta;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.sharedService.cedulaSeleccionada$.subscribe(cedula => {
      if (cedula) {
        this.mostrarDatosConsultaID(cedula);
      }
    });
  }

  mostrarDatosConsultaID(cedula: string) {
    this.items = this.firestore.collection('consulta').valueChanges();
    // Suponiendo que cedula es única, encuentra al usuario con la cedula correspondiente
    this.items.subscribe(data => {
      this.userData = data.find(user => user.cedula === cedula);
      console.log('UserData:', this.userData);
    });
  }

  seleccionarUsuario(usuario: Consulta) {
    this.sharedService.actualizarCedula(usuario.cedula);
    this.usuario = usuario; // Update the usuario property
    this.mostrarDatosConsultaID(usuario.cedula); // Llamada adicional si quieres actualizar los datos inmediatamente
  }
}
