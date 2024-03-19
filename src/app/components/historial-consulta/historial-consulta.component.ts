import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/interfaces/consulta';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-historial-consulta',
  templateUrl: './historial-consulta.component.html',
  styleUrls: ['./historial-consulta.component.css']
})
export class HistorialConsultaComponent implements OnInit {

  listUsuarios: Consulta[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'fechaIngreso', 'examenes', 'c_subsecuente', 'historial'];


  dataSource = new MatTableDataSource(this.listUsuarios);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  @Input() usuario!: Consulta;
  items: Observable<any[]> | undefined;
  userData: any | undefined;
  formularios: any[] = [];
  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private sharedService: SharedService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
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
    this.sharedService.getAllData().subscribe((data: any[]) => {
      // Filtrar los formularios del usuario por su cédula
      this.formularios = data;
      this.userData = data.find(user => user.cedula === cedula);
      const formulariosUsuario = data.filter(formulario => formulario.cedula === cedula);

      // Ordenar los formularios por fecha de ingreso
      formulariosUsuario.sort((a, b) => {
        return new Date(a.fechaIngreso).getTime() - new Date(b.fechaIngreso).getTime();
      });

      // Establecer la fecha de ingreso del primer formulario como "FECHA INGRESO"
      this.userData.fechaIngreso = formulariosUsuario.length > 0 ? formulariosUsuario[0].fechaIngreso : null;

      // Obtener la fecha de ingreso del último formulario
      this.userData.fechaUltima = formulariosUsuario.length > 0 ? formulariosUsuario[formulariosUsuario.length - 1].fechaIngreso : null;

      // Mostrar los formularios obtenidos
      console.log('Formularios del usuario:', formulariosUsuario);

      // Actualizar la interfaz de usuario con los formularios obtenidos
      this.dataSource.data = formulariosUsuario;
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

  error(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


  revisarDatosGenerales(formulario: any) {
    if (formulario) {
      console.log('Formulario seleccionado:', formulario);
      this.router.navigate(['/historial-inicio'], { state: { formulario: formulario } });
    } else {
      this.error('No hay datos disponibles para revisar en Historial de Inicio');
    }
  }

  revisarEnfermeria(formulario: any) {
    if (formulario) {
      console.log('Formulario seleccionado:', formulario);
      this.router.navigate(['/historial-enfermeria'], { state: { formulario: formulario } });
    } else {
      this.error('No hay datos disponibles para revisar en Historial de Enfermería');
    }
  }

  revisarConsulta(formulario: any) {
    if (formulario) {
      console.log('Formulario seleccionado:', formulario);
      this.router.navigate(['/historia-consulta-detallle'], { state: { formulario: formulario } });
    } else {
      this.error('No hay datos disponibles para revisar en Historial de Consulta');
    }
  }
}