import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Estado de autenticación

  constructor(private http: HttpClient) {
    const token = this.getToken();
    this.loggedIn.next(!!token); // Establece el estado según el token
  }

  // Método para iniciar sesión
  public login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${baserUrl}/usuario/login`, loginData);
  }

  // Método para registrar un nuevo usuario
  public register(user: any): Observable<any> {
    return this.http.post(`${baserUrl}/usuario/registrar`, user);
  }

  // Manejo de tokens
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // Usuario autenticado
  }

  public logout(): void {
    localStorage.removeItem('token'); // Elimina el token
    this.loggedIn.next(false); // Usuario no autenticado
  }

  public isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable(); // Devuelve el estado de autenticación
  }
}
