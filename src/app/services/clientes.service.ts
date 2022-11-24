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
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/lista`);
  }
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${url}/create`, cliente);
  }
}
