import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit 
{
  name: string;
  email: string;
  phone: string;
  password: string;

  constructor( 

    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ){}
  

  ngOnInit() {
  }
  async register()
  {
    if(this.name && this.email && this.phone && this.password)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Procesando..',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password) 
      .then((data)=>{
        data.user.sendEmailVerification();
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userEmail': this.email,
          'userPhone': this.phone,
          'createdAt': Date.now()
        })
        .then(()=> {
          loading.dismiss();
          this.toast('Registro completado! Porfavor verifique su email e ingrese nuevamente!', 'success');
          this.router.navigate(['/loginpage']);
        })
        .catch(error => {
          loading.dismiss();
          console.log(error.message, 'danger');

        })
      })
      .catch(error =>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    } else{
      this.toast('Porfavor rellenar los campos solicitados', 'warning')
    }
  } // Registro terminado

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }  // Advertencia terminada


  

}
