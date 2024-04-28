import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './interfazes/componentes/login-register/login-register.component';
import { NavbardComponent } from './interfazes/compartido/navbard/navbard.component';
import { LandingComponent } from './interfazes/compartido/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'login-registro', component: LoginRegisterComponent },
  { path: 'nav', component: NavbardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
