import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: "app-lista-asistencias",
  templateUrl: "./lista-asistencias.page.html",
  styleUrls: ["./lista-asistencias.page.scss"]
})
export class ListaAsistenciasPage implements OnInit {

  code: any;


  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {

  }
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
   
      this.code = barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}