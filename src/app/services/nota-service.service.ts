import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../Modelos/nota';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private baseUrl = 'http://localhost:8080/nota'; // Ajusta según la configuración de tu servidor

  constructor(private http: HttpClient) { }

  // Obtener una nota por ID
  public getNotaById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.baseUrl}/${id}`);
  }

  // Otros métodos (crear, eliminar, actualizar)
  public createNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.baseUrl}/registrar`, nota);
  }

  actualizarNota(id: number, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.baseUrl}/actualizar/${id}`, nota);
  }

  public deleteNota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }


  // Método para obtener las notas del usuario autenticado
  public getNotasDelUsuarioAutenticado(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.baseUrl}/vernotas`);
  }
}
