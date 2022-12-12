import { UsuarioCadastroComponent } from './components/usuarios/usuario-cadastro/usuario-cadastro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ClientesCadastroComponent } from './components/clientes/clientes-cadastro/clientes-cadastro.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { ProjetosCadastroComponent } from './components/projetos/projetos-cadastro/projetos-cadastro.component';

const routes: Routes = [
  { path: '', component: TarefasComponent },
  { path: 'clientes/lista', component: ClientesComponent },
  { path: 'clientes/cadastro', component: ClientesCadastroComponent },
  { path: 'clientes/visualizar/:id', component: ClientesCadastroComponent },
  { path: 'clientes/editar/:id', component: ClientesCadastroComponent },
  { path: 'usuarios/lista', component: UsuariosComponent },
  { path: 'usuarios/cadastro', component: UsuarioCadastroComponent },
  { path: 'usuarios/editar/:id', component: UsuarioCadastroComponent },
  { path: 'usuarios/visualizar/:id', component: UsuarioCadastroComponent },
  { path: 'projetos/listagem', component: ProjetosComponent },
  { path: 'projetos/cadastro', component: ProjetosCadastroComponent },
  { path: 'projetos/editar/:id', component: ProjetosCadastroComponent },
  { path: 'projetos/visualizar/:id', component: ProjetosCadastroComponent },
  // { path: 'tarefas/listagem' },
  // { path: 'tarefas/cadastro' },
  // { path: 'tarefas/editar/:id' },
  // { path: 'tarefas/visualizar/:id' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
