import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {

  constructor(

    private router: Router

  ) { 

  }

  ngOnInit() {
    
  }
  gotoAsistencia(){
    this.router.navigate(['/lista-asistencias']);
  }
}
