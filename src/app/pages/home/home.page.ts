import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private auth: AuthService,
    private router: Router
  )  {}

  cerrarSesion(){
    this.logout();
    this.router.navigate(['/login']);}

  gotoProfile()
  {
    this.router.navigate(['/profile']);
  }

  logout()
  {
    this.auth.signOut();
  }
  
  gotoAsistencia(){
    this.router.navigate(['/lista-asistencias']);
  }

  gotoLista(){
    this.router.navigate(['/carrito'])
  }
  }
