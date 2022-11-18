import { Component, OnDestroy, } from "@angular/core";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Router } from '@angular/router';

@Component({
  selector: "app-lista-asistencias",
  templateUrl: "./lista-asistencias.page.html",
  styleUrls: ["./lista-asistencias.page.scss"]
})
export class ListaAsistenciasPage implements OnDestroy{

  qrCodeString = 'ASISTENCIA';
  scannedResult: any;
  content_visibility = '';

  constructor(   
    
    private router: Router,
  
    ){

  }

  async checkPermission() {
    try {
      // Revisar o solicitar permisos
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
        this.content_visibility = 'SE HA PRESENTADO CORRECTAMENTE';
        this.router.navigate(['/listas']);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
      this.stopScan();
  }

}