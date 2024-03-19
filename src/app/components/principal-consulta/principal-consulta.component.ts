import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/interfaces/consulta';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-principal-consulta',
  templateUrl: './principal-consulta.component.html',
  styleUrls: ['./principal-consulta.component.css']
})
export class PrincipalConsultaComponent implements OnInit {

  listUsuarios: Consulta[] = [];

  displayedColumns: string[] = ['cedula', 'nombres', 'fechaIngreso', 'fechaUltima', 'historial'];

  dataSource = new MatTableDataSource(this.listUsuarios);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _sharedService: SharedService, private router: Router,) {
  }

  ngOnInit(): void {
    this.getAllData();
  }


  getAllData() {
    this._sharedService.getAllData().subscribe(data => {
      const usuariosMap = new Map<string, Consulta>();

      data.forEach((element: any) => {
        const usuario: Consulta = {
          id: element.id,
          ...element
        };

        if (!usuariosMap.has(usuario.cedula)) {
          usuariosMap.set(usuario.cedula, usuario);
        } else {
          // Si ya existe un usuario con esta cédula, comparar las fechas y actualizar si es necesario
          const existingUsuario = usuariosMap.get(usuario.cedula)!;
          if (usuario.fechaIngreso > existingUsuario.fechaIngreso) {
            existingUsuario.fechaIngreso = usuario.fechaIngreso;
          }
          if (usuario.fechaIngreso < existingUsuario.fechaIngreso) {
            existingUsuario.fechaUltima = usuario.fechaIngreso;
          }
        }
      });

      this.listUsuarios = Array.from(usuariosMap.values());
      this.dataSource.data = this.listUsuarios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  getDatosEnfermeria() {
    this._sharedService.mostrarDatosConsulta().subscribe(data => {
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
    this.router.navigate(['/historial-consulta', { usuario: cedula }]);
  }

}
