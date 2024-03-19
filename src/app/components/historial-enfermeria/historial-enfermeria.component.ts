import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  listUsuarios: Enfermeria[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'fechaIngreso', 'historial'];

  dataSource = new MatTableDataSource(this.listUsuarios);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  @Input() usuario!: Enfermeria;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  formularios: any[] = [];
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

  cargarUsuario() {
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mostrarDatosEnfermeriaID(cedula: string) {
    this.firestore.collection('enfermeria', ref => ref.where('cedula', '==', cedula)).valueChanges()
      .subscribe((data: any[]) => {
        this.formularios = data;
        this.userData = data.find(user => user.cedula === cedula);

        // Ordenar los formularios por fecha de ingreso
        this.formularios.sort((a, b) => {
          return new Date(a.fechaIngreso).getTime() - new Date(b.fechaIngreso).getTime();
        });

        // Establecer la fecha de ingreso del primer formulario como "FECHA INGRESO"
        this.userData.fechaIngreso = this.formularios[0]?.fechaIngreso;

        // Obtener la fecha de ingreso del último formulario
        const ultimaFecha = this.formularios[this.formularios.length - 1]?.fechaIngreso;

        // Establecer la fecha de ingreso del último formulario como "ULTIMA FECHA"
        this.userData.fechaUltima = ultimaFecha;

        this.dataSource.data = this.formularios;

        console.log('Formularios del usuario:', this.formularios);
      });
  }



  seleccionarUsuario(usuario: Enfermeria) {
    this.sharedService.actualizarCedula(usuario.cedula);
    this.usuario = usuario; // Update the usuario property
    this.mostrarDatosEnfermeriaID(usuario.cedula); // Llamada adicional si quieres actualizar los datos inmediatamente
  }


  revisarUsuario(formulario: any) {
    // Aquí puedes hacer lo que necesites con el formulario seleccionado
    console.log('Formulario seleccionado:', formulario);

    this.router.navigate(['/list-enfermeria'], { state: { formulario: formulario } });

  }


}
