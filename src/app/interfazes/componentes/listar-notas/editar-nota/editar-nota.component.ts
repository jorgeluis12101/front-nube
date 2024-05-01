import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaService } from '../../../../services/nota-service.service';
import { Nota } from '../../../../Modelos/nota';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit {
  nota: Nota = {
    titulo: '',
    descripcion: '',
    imagenBase64: '' // Asegúrate de incluir todos los campos opcionales también
  };

  constructor(
    private notaService: NotaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarNota();
  }

  cargarNota(): void {
    const id = +this.route.snapshot.params['id'];
    this.notaService.getNotaById(id).subscribe({
      next: (data: Nota) => this.nota = data,
      error: (e: any) => console.error('Error al obtener la nota', e)
    });
  }

  onSubmit(): void {
    this.notaService.actualizarNota(this.nota.id!, this.nota).subscribe({
      next: () => {
        console.log('Nota actualizada');
        this.router.navigate(['/notas']);
      },
      error: (e: any) => console.error('Error al actualizar la nota', e)
    });
  }
}
