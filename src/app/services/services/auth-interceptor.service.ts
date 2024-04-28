import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Ajusta según tu estructura

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Obtiene el token del `localStorage`

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`), // Agrega el token
      });
      return next.handle(cloned); // Pasa la solicitud con el token
    } else {
      return next.handle(req); // Pasa la solicitud sin el token
    }
  }
}
