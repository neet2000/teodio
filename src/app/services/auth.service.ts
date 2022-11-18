import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router} from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';

@Injectable()

export class AuthService 
{

  user$: Observable<User>;
  user: User;

  constructor
  (
    
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController,
  ) 
  
  { 
    this.user$ = this.afauth.authState 
    .pipe(
      switchMap( user =>{

        if(user)
        {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        
        }
        
      })
    )

    }

     // Fin del constructor

     async signOut()
     {
       const loading = await this.LoadingCtrl.create({
         spinner: 'crescent',
         showBackdrop: true
         
       });
         loading.present();
     
         this.afauth.signOut()
         .then(()=> {
           loading.dismiss();
           this.router.navigate(['/loginpage']);
     
         })
         
     
     }
     async toast(message, status){
       const toast = await this.toastr.create({
         message: message,
         color: status,
         position: 'top',
         duration: 2000
       });
       toast.present();
       // Fin del toast
     
     }
async signIn(email, password)
{
  const loading = await this.LoadingCtrl.create({
    message: 'Autentificando..',
    spinner: 'crescent',
    showBackdrop: true
   } );

    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
    .then(()=>{
      this.afauth.signInWithEmailAndPassword(email, password)
      .then((data)=>
      {
        if(!data.user.emailVerified)
        {

          loading.dismiss();
          this.toast('Porfavor verifique su correo o contraseña!', 'Cuidado!');
          this.afauth.signOut();
        }else{
          loading.dismiss();
          this.router.navigate(['/home']);
      }
      
    })
      .catch(error => {
  
      this.toast(error.message, 'danger');
    
    })
  })

  .catch(error => {
  
    loading.dismiss();
    this.toast(error.message, 'danger');
  
  });
}

}