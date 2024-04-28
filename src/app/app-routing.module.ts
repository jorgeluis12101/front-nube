import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './interfazes/componentes/login-register/login-register.component';
import { NavbardComponent } from './interfazes/compartido/navbard/navbard.component';
import { LandingComponent } from './interfazes/compartido/landing/landing.component';
import { DashboardComponent } from './interfazes/componentes/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { FooterComponent } from './interfazes/compartido/footer/footer.component';
import { Parte1Component } from './interfazes/compartido/landing/parte1/parte1.component';
import { Parte2Component } from './interfazes/compartido/landing/parte2/parte2.component';
import { Parte3Component } from './interfazes/compartido/landing/parte3/parte3.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'login-registro', component: LoginRegisterComponent },
  { path: 'nav', component: NavbardComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'lan1', component: Parte1Component },
  { path: 'lan2', component: Parte2Component },
  { path: 'lan3', component: Parte3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
