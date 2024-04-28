import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../Modelos/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private baseUrl = 'http://localhost:8080/nota'; // Ajusta la URL según la configuración de tu servidor

  constructor(private http: HttpClient) {}

  // Crear una nueva nota
  public createNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.baseUrl}/registrar`, nota);
  }
  public getNotasDelUsuarioAutenticado(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.baseUrl}/vernotas`); // Obtiene las notas del usuario autenticado
  }
   // Eliminar una nota por ID
   public deleteNota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Actualizar una nota por ID
  public updateNota(id: number, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.baseUrl}/actualizar/${id}`, nota);
  }

}
