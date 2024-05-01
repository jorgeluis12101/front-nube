import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta según tu proyecto

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        console.log('Token:', authToken); // Esto te mostrará el token en la consola del navegador
        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
