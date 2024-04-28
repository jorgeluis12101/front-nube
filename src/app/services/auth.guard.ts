import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken(); // Verifica si hay un token
    if (token) {
      return true; // Usuario autenticado
    } else {
      this.router.navigate(['/']); // Usuario no autenticado, redirige a la página de inicio de sesión
      return false; // Bloquea el acceso
    }
  }
}
