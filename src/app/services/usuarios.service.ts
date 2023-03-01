import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario/usuario';

const url = `${environment.api_usuario_url}/Usuario`;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${url}`, usuario);
  }

  details(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${url}/detalhes/${id}`);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${url}/update`, usuario);
  }

  recuperarUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${url}/Recuperar`);
  }

  uploadImage(formData: FormData, id: any): Observable<any> {
    return this.http.post<any>(`${url}/UpdateProfileImage/${id}`, formData);
  }

  getUserPerfileimg(fileName: string): Observable<any> {
    return this.http.get<any>(`${url}/profilepicture/${fileName}`);
  }
}
