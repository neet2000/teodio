import {Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {

  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl: LoadingController

  ) { }

  ngOnInit() {
  }

  login()
  {
    if(this.email && this.password)
    {
      this.auth.signIn(this.email, this.password);
    }else {
      
      this.toast('Porfavor ingrese su email y contraseña', 'warning');
      

    }
  }
  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}