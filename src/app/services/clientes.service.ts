import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/Clientes/cliente';

const url = `${environment.api_url}`;

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) { }

  filtrar(razaoSocial: string, cnpj: string, email: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/filtrar/${razaoSocial}/${cnpj}/${email}`);
  }

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/lista`);
  }
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${url}/create`, cliente);
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${url}/update/${id}`, cliente);
  }

  details(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${url}/details/${id}`);
  }

  delete(id: number | null): Observable<any> {
    return this.http.delete<any>(`${url}/delete/${id}`);
  }
}
