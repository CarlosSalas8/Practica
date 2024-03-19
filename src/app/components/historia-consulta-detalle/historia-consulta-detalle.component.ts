import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/interfaces/consulta';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-historia-consulta-detalle',
  templateUrl: './historia-consulta-detalle.component.html',
  styleUrls: ['./historia-consulta-detalle.component.css']
})
export class HistoriaConsultaDetalleComponent implements OnInit {

  listUsuarios: Consulta[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'fechaIngreso', 'historial'];

  dataSource = new MatTableDataSource(this.listUsuarios);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  @Input() usuario!: Consulta;
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

  mostrarFormulariosPorCedula(cedula: string) {

    this.firestore.collection('consulta', ref => ref.where('cedula', '==', cedula)).valueChanges()
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

  cargarUsuario() {
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  seleccionarUsuario(usuario: Consulta) {
    this.sharedService.actualizarCedula(usuario.cedula);
    this.usuario = usuario; // Update the usuario property
    this.mostrarFormulariosPorCedula(usuario.cedula); // Llamada adicional si quieres actualizar los datos inmediatamente
  }

  revisarUsuario(formulario: any) {
    // Aquí puedes hacer lo que necesites con el formulario seleccionado
    console.log('Formulario seleccionado:', formulario);

    this.router.navigate(['/list-consulta'], { state: { formulario: formulario } });

  }

}
