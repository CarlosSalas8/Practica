import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { SharedService } from 'src/app/services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Enfermeria } from 'src/app/interfaces/enfermeria';

@Component({
  selector: 'app-principal-enfermeria',
  templateUrl: './principal-enfermeria.component.html',
  styleUrls: ['./principal-enfermeria.component.css']
})
export class PrincipalEnfermeriaComponent  implements OnInit {

  listUsuarios: Enfermeria[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'fechaIngreso', 'fechaUltima', 'historial'];

  dataSource = new MatTableDataSource(this.listUsuarios);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _sharedService: SharedService, private router: Router) {
  }

  ngOnInit(): void {
    this.getDatosEnfermeria();
  }

  getDatosEnfermeria() {
    this._sharedService.mostrarDatosEnfermeria().subscribe(data => {
      this.listUsuarios = [];
      data.forEach((element: any) => {

        this.listUsuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });

      this.dataSource.data = this.listUsuarios;
      // Inicializar el ordenamiento
      this.dataSource.sort = this.sort;
      console.log(this.listUsuarios);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  revisarUsuario(cedula: any) {
    this._sharedService.actualizarCedula(cedula)
    console.log(cedula);
    this.router.navigate(['/list-enfermeria', { usuario: cedula }]);
  }

}
