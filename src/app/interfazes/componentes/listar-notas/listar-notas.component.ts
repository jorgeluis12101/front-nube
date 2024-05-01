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
      (notas: Nota[]) => {
        this.notas = notas;
      },
      (error: any) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }

  editarNota(nota: Nota): void {
    Swal.fire({
      title: 'Editar Nota',
      html: `
        <input id="titulo" class="swal2-input" placeholder="Título" value="${nota.titulo}">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción">${nota.descripcion}</textarea>
      `,
      confirmButtonText: 'Actualizar',
      focusConfirm: false,
      preConfirm: () => {
        const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
        const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
        return { titulo, descripcion };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarNota(nota.id!, result.value.titulo, result.value.descripcion);
      }
    });
  }

  actualizarNota(id: number, titulo: string, descripcion: string): void {
    const notaActualizada: Nota = { id, titulo, descripcion }; // Asegúrate de incluir todos los campos necesarios aquí
    this.notaService.actualizarNota(id, notaActualizada).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'La nota ha sido actualizada con éxito', 'success');
        this.ngOnInit(); // Recargar las notas
      },
      error: (e: any) => {
        console.error('Error al actualizar la nota', e);
        Swal.fire('Error', 'No se pudo actualizar la nota', 'error');
      }
    });
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
            this.notas = this.notas.filter((nota) => nota.id !== id);
            Swal.fire('Eliminado', 'La nota fue eliminada con éxito', 'success');
          },
          (error: any) => {
            Swal.fire('Error', 'No se pudo eliminar la nota', 'error');
          }
        );
      }
    });
  }
}
