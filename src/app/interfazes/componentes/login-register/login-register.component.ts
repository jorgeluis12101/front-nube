import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  LoginMode = true; // Alterna entre modo de inicio de sesión y registro

  loginData = {
    username: '',
    password: '',
  };

  registerData = {
    nombre: '',
    apellido: '',
    telefono: '',
    dni: '',
    correo: '',
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Alternar entre los modos de inicio de sesión y registro
  switchMode() {
    this.LoginMode = !this.LoginMode;
  }

  onLogin() {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      (response) => {
        const token = response.token;
        this.authService.setToken(token);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
        }); // Muestra mensaje de éxito
        this.router.navigate(['/dashboard']); // Ajusta según tu aplicación
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Verifica tus credenciales y vuelve a intentarlo.',
        }); // Muestra mensaje de error
      }
    );
  }

  onRegister() {
    this.authService.register(this.registerData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada con éxito.',
        }); // Muestra mensaje de éxito
        this.router.navigate(['/login-registro']); // Ajusta según tu aplicación
      },
      (error) => {
        console.error('Error al registrar', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un problema. Intenta nuevamente.',
        }); // Muestra mensaje de error
      }
    );
  }
}
