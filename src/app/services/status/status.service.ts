import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Status } from 'src/app/models/status/status';

const url = `${environment.api_url}/Status`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  listaTodos(): Observable<Status[]> {
    return this.http.get<Status[]>(`${url}/listaStatus`);
  }
}
