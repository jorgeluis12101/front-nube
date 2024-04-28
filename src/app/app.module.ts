import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './interfazes/componentes/login-register/login-register.component';
import { NavbardComponent } from './interfazes/compartido/navbard/navbard.component';
import { FooterComponent } from './interfazes/compartido/footer/footer.component';
import { LandingComponent } from './interfazes/compartido/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    NavbardComponent,
    FooterComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
