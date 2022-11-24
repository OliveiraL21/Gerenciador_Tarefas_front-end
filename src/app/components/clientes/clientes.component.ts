import { ClientesService } from 'src/app/services/clientes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Clientes/cliente';

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

  listaClientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private clienteService: ClientesService
  ) {}

  novoCliente(): void {
    this.route.navigateByUrl('clientes/cadastro');
  }

  listar() {
    this.clienteService.listarTodos().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes.sort((a: any, b: any) =>
          a.Razao_Social < b.Razao_Social ? -1 : 1
        );
        console.log(this.listaClientes);
      },
    });
  }
  ngOnInit(): void {
    this.listar();
    this.form = this.fb.group({
      Razao_Social: [null, null],
      Cnpj: [null, null],
    });
  }
}
