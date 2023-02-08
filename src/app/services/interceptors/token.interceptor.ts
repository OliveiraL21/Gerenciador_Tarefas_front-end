import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogoutService } from '../logout/logout.service';
import { request } from 'http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private logoutService: LogoutService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    // REQUISIÇÃO QUE ESTÁ SENDO ENVIADA
    const requestUrl: Array<any> = request.url.split("/");
    const apiUrl: Array<any> = environment.api_url.split("/");

    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          token: `${token}`
        }
      });
      return next.handle(request);
    }
    else {
      return next.handle(request);
    }

  }
}
