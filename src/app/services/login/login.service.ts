import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from 'src/app/models/login/usuario-login';


const url = `${environment.api_usuario_url}/login`;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioLogin): Observable<any> {
    return this.http.post<any>(`${url}`, usuario);
  }
}
