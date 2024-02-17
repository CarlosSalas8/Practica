import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-historial-inicio',
  templateUrl: './historial-inicio.component.html',
  styleUrls: ['./historial-inicio.component.css']
})
export class HistorialInicioComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'fechaIngreso', 'historial'];

  dataSource = new MatTableDataSource(this.listUsuarios);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  @Input() usuario!: Usuario;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  formularios: any[] = [];
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService, private router: Router, private route: ActivatedRoute,) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.sharedService.cedulaSeleccionada$.subscribe(cedula => {
      if (cedula) {
        this.mostrarFormulariosPorCedula(cedula);
      }
    });
  }


  cargarUsuario() {
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mostrarFormulariosPorCedula(cedula: string) {
    this.firestore.collection('datosGenerales', ref => ref.where('cedula', '==', cedula)).valueChanges()
      .subscribe((data: any[]) => {
        this.formularios = data;
        this.userData = data.find(user => user.cedula === cedula);

        // Establecer la fecha de ingreso del primer formulario como "FECHA INGRESO"
        this.userData.fechaIngreso = this.formularios[0]?.fechaIngreso;

        // Establecer la fecha de ingreso del segundo formulario como "ULTIMA FECHA"
        this.userData.fechaUltima = this.formularios[this.formularios.length - 1]?.fechaIngreso;

        this.dataSource.data = this.formularios;

        console.log('Formularios del usuario:', this.formularios);
      });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.sharedService.actualizarCedula(usuario.cedula);
    this.usuario = usuario; // Update the usuario property
    this.mostrarFormulariosPorCedula(usuario.cedula); // Llamada adicional si quieres actualizar los datos inmediatamente
  }

  revisarUsuario(formulario: any) {
    // Aquí puedes hacer lo que necesites con el formulario seleccionado
    console.log('Formulario seleccionado:', formulario);

    this.router.navigate(['/list-inicio'], { state: { formulario: formulario } });

  }


}




