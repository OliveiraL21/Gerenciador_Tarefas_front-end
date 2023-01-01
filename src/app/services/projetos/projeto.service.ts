import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Projeto, ProjetoListagem } from 'src/app/models/Projetos/projeto';

const url = `${environment.api_url}/`;
@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  constructor(private http: HttpClient) { }

  listaTodos(): Observable<ProjetoListagem[]> {
    return this.http.get<ProjetoListagem[]>(`${url}lista/projetos`);
  }
  listaSimples(): Observable<any[]> {
    return this.http.get<any[]>(`${url}lista_simples`);
  }

  filtrar(projeto?: number, cliente?: number, status?: number): Observable<ProjetoListagem[]> {
    return this.http.get<ProjetoListagem[]>(`${url}Projetos/filtrar_projetos/${projeto}/${cliente}/${status}`);
  }

  create(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(`${url}projeto/create`, projeto);
  }

  update(id: number, projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${url}projeto/update/${id}`, projeto);
  }

  details(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${url}projeto/details/${id}`);
  }

  delete(id: number): Observable<Projeto> {
    return this.http.delete<Projeto>(`${url}projeto/delete/${id}`);
  }
}
