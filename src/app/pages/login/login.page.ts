import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginOpcionesPage } from './modals/login-opciones/login-opciones.page';
import { LoginRestablecerContrasenaPage } from './modals/login-restablecer-contrasena/login-restablecer-contrasena.page';
import { LoginService } from './service/login.service';
//import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  clave: string = ''; // Variable para almacenar la contraseña
  showPassword: boolean = false; // Variable para alternar la visibilidad de la contraseña

  constructor(private modalController: ModalController, 
              private loginService: LoginService, 
              private alertController: AlertController,
              private afAuth: AngularFireAuth,
              private router: Router,
              private appc: AppComponent,
              private nav: NavController) { }

  PasswordVisible() {
    this.showPassword = !this.showPassword;
  }

  async ngOnInit() {
    const isLoggedIn = await this.appc.isLoggedIn();
  
    // Si el usuario ha iniciado sesión, redirige al usuario a la página de inicio
    if (isLoggedIn) {
      this.nav.navigateBack(['/home']);
    }
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: LoginOpcionesPage, // Componente del modal
      componentProps: {
      }
    });
  
    return await modal.present();
  }

  async abrirModalcontrasena() {
    const modal = await this.modalController.create({
      component: LoginRestablecerContrasenaPage, // Componente del modal
      componentProps: {
      }
    });
  
    return await modal.present();
  }

  
  // iniciarSesion() {
  //   if (this.email && this.clave) {
  //     // Encripta la clave usando SHA-256 antes de enviarla
  //     const claveEncriptada = CryptoJS.SHA256(this.clave).toString();
  
  //     const requestBody = {
  //       email: this.email,
  //       clave: claveEncriptada
  //     };
  
  //     console.log("Datos por parte del cliente:", "correo:", this.email, "clave:", claveEncriptada);
      
  //     this.loginService.validarLogin(requestBody).subscribe({
  //       next: (response: any) => {
  //         if (response && response.success) {
  //           console.log('Inicio de sesión exitoso:', response);
  //         } else {
  //           console.error('Inicio de sesión fallido:', response.message);
  //           this.presentAlert();
  //         }
  //       },
  //       error: (error: any) => {
  //         console.error('Error al iniciar sesión:', error);
  //       }
  //     });
  //   }
  // }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Atencion!',
      subHeader: 'Usuario y/o contraseña invalidos',
      message: 'Verifique sus credenciales',
      buttons: ['OK'],
    });

    await alert.present();
  }
  
  async iniciarSesion(email: string, clave: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, clave);


      this.loginService.validarLogin(email).subscribe(
        (data: any) => {

          this.appc.setUser({ id: data.id_usuario, tipo_usuario: data.tipo_usuario, email: data.email, isLoggedIn: true });

          this.Especialistas();
  
        }, (error: any) => {
          console.log('Error:', error);
        }
      );

      //this.Especialistas();
      console.log('Inicio de sesión exitoso:', userCredential.user);

    } catch (error) {
      console.error('Inicio de sesión fallido:', error);
      this.presentAlert(); //  Alerta al usuario si falla el inicio de sesión
    }
  }


  Especialistas(){
    this.router.navigate(['/home']);
  }

}


