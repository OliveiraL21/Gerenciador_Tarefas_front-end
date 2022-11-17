import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {
  pageTitle: string = 'Cadastro de Usuários';
  breadCrumbItem: string = 'Cadastro';
  constructor() {}

  ngOnInit(): void {}
}
