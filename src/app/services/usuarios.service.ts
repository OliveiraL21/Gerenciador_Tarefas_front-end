import { Usuarios } from './../models/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const url = `${environment.api_url}/Usuarios`;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  create(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${url}/create`, usuario);
  }

  listaUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${url}/lista`);
  }

  details(id: any): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${url}/details/${id}`);
  }

  update(id: any, usuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${url}/update/${id}`, usuario);
  }

  filtro(login: string, email: string, nome: string): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${url}/filtro/${login}/${email}/${nome}`);
  }
}
