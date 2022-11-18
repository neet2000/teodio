import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;
  constructor(

    private afauth: AngularFireAuth,
    private toastr: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController

  ) { }

  ngOnInit() {
  }

  async resetPassword()
  {
    if(this.email)
    {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando link de recuperacion..',
      spinner: 'crescent',
      showBackdrop: true

    });
    loading.present();

    this.afauth.sendPasswordResetEmail(this.email)
    .then(()=> {
      loading.dismiss();
      this.toast('Porfavor revise su email', 'success');
      this.router.navigate(['/loginpage']);

    })
    .catch((error)=> {
      this.toast(error.message, 'danger');

    })

  } else {
    this.toast('Porfavor ingrese su correo electronico!', 'danger');
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
