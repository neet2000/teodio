import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

userId: string;
nombre: string;
email: string;
celular: string;

  constructor(

    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router

  ) { }

  ngOnInit()
   {
    this.auth.user$.subscribe(user=> {
      this.userId = user.userId;
      this.nombre= user.userName;
      this.email = user.userEmail;
      this.celular = user.userPhone;

    })
  }
  async updateProfile()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Editando..',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afs.collection('user').doc(this.userId).set({
      'userName': this.nombre,
      'userEmail': this.email,
      'userPhone': this.celular,
      'editAt': Date.now()
    },{merge: true})
    .then(()=> {
      loading.dismiss();
      this.toast('Actualizacion completada', 'success');
      this.router.navigate(['/profile']);
    })
    .catch(error =>{
      loading.dismiss();
      this.toast(error.message, 'danger');
    })

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


