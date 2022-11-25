import { UsuarioCadastroComponent } from './components/usuarios/usuario-cadastro/usuario-cadastro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ClientesCadastroComponent } from './components/clientes/clientes-cadastro/clientes-cadastro.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
