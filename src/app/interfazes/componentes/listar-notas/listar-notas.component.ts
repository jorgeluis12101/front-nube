import { Component, OnInit } from '@angular/core';
import { NotaService } from 'src/app/services/nota-service.service';
import { Nota } from 'src/app/Modelos/nota';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css'],
})
export class ListaNotasComponent implements OnInit {
  notas: Nota[] = [];

  constructor(private notaService: NotaService, private router: Router) {}

  ngOnInit(): void {
    this.notaService.getNotasDelUsuarioAutenticado().subscribe(
      (notas) => {
        this.notas = notas; // Guarda la lista de notas
      },
      (error) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }

  eliminarNota(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.notaService.deleteNota(id).subscribe(
          () => {
            this.notas = this.notas.filter((nota) => nota.id !== id); // Elimina la nota del array
            Swal.fire('Eliminado', 'La nota fue eliminada con éxito', 'success');
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar la nota', 'error');
          }
        );
      }
    });
  }

  editarNota(id: number): void {
    this.router.navigate(['/dashboard/editar-nota', id]); // Navega al componente de edición
  }
}
