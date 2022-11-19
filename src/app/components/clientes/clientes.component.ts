import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  pageTitle: string = 'Clientes';
  breadCrumbItem: string = 'Lista de Clientes';
  form!: FormGroup;
  isSpinning: boolean = false;

  listaClientes: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Razao_Social: [null, null],
      Cnpj: [null, null],
    });
  }
}
