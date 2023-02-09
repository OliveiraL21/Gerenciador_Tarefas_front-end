import { UsuarioCadastroComponent } from './components/usuarios/usuario-cadastro/usuario-cadastro.component';
import { TarefasCadastroComponent } from './components/tarefas/tarefas-cadastro/tarefas-cadastro.component';
import { ProjetosCadastroComponent } from './components/projetos/projetos-cadastro/projetos-cadastro.component';
import { RouterModule } from '@angular/router';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ClientesCadastroComponent } from './components/clientes/clientes-cadastro/clientes-cadastro.component';
import { NgxMaskModule } from 'ngx-mask';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { LoginComponent } from './components/login/login.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { MinhaContaComponent } from './components/usuarios/minha-conta/minha-conta.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    UsuarioCadastroComponent,
    ClientesCadastroComponent,
    TarefasComponent,
    ProjetosComponent,
    ProjetosCadastroComponent,
    TarefasComponent,
    TarefasCadastroComponent,
    LoginComponent,
    MinhaContaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzNotificationModule,
    NzSpinModule,
    NzCollapseModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTagModule,
    NzTimePickerModule,
    NzAvatarModule,
    NzCheckboxModule,
    NzMessageModule,
    NzUploadModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
