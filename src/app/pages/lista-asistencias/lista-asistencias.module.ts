import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAsistenciasPageRoutingModule } from './lista-asistencias-routing.module';

import { ListaAsistenciasPage } from './lista-asistencias.page';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsistenciasPageRoutingModule,
    QRCodeModule
    
  ],
  declarations: [ListaAsistenciasPage]
})
export class ListaAsistenciasPageModule {}
