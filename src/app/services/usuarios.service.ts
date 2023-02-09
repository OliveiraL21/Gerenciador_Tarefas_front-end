import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario/usuario';

const url = `https://localhost:44336/Usuario`;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${url}`, usuario);
  }

  details(id: number): Observable<Usuario> {
    return this.http.get<any>(`${url}/detalhes/${id}`);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${url}/update`, usuario);
  }
}
