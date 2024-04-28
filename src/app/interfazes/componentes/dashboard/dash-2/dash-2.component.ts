import { Component } from '@angular/core';
import { Nota } from '../../../../Modelos/nota';
import { NotaService } from 'src/app/services/nota-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-2',
  templateUrl: './dash-2.component.html',
  styleUrls: ['./dash-2.component.css'],
})
export class Dash2Component {
  noteTitle = '';
  noteText = '';
  imageBase64: string | undefined;
  imageFile: File | null = null;

  constructor(private notaService: NotaService) {}

  // Manejar el cambio de imagen
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) { // Asegúrate de que no es `null` antes de convertir
      this.imageFile = file;
      this.convertToBase64(file); // Convertir a Base64
    }
  }

  // Método para enviar la nota
  submit() {
    const nuevaNota: Nota = {
      titulo: this.noteTitle,
      descripcion: this.noteText,
      imagenBase64: this.imageBase64, // Asignar solo si se convierte con éxito
    };

    this.notaService.createNota(nuevaNota).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Nota creada',
          text: 'La nota se ha creado exitosamente.',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la nota',
          text: 'No se pudo crear la nota.',
        });
      }
    );
  }

  // Método para convertir una imagen a Base64
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageBase64 = e.target.result; // Guardar la conversión
    };
    reader.readAsDataURL(file);
  }
}
