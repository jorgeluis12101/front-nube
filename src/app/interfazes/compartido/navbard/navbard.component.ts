import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css'],
})
export class NavbardComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout(); // Cierra sesión
    this.router.navigate(['/']); // Redirige a la página de inicio
  }
  
}
