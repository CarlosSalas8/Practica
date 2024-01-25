import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  typesOfShoes: string[] = ['E039', 'E10-E11', 'E66', 'E785-E780-E781-E782', 'I10', 'I21-I64', 'N188', 'Z108 (Control general de salud de rutina de residentes de instituciones)', 'Otros'];
  isOtherSelected: boolean = false;
  otherOption: string = '';
  form: FormGroup; // Declarar form como un FormGroup

  onSelectionChange(event: any) {
    this.isOtherSelected = event.source.selectedOptions.selected.some((option: { value: string; }) => option.value === 'Otros');
  }
  constructor() {
    this.form = new FormGroup({
      // Aquí debes definir tus campos y sus validaciones, por ejemplo:
      // 'nombre': new FormControl('', Validators.required),
      // 'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
