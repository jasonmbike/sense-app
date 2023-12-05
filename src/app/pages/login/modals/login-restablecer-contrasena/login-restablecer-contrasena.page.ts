import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';  // Importa 'take' de RxJS
import { LoginRestablecerContrasenaService } from './service/login-restablecer-contrasena.service';


@Component({
  selector: 'app-login-restablecer-contrasena',
  templateUrl: './login-restablecer-contrasena.page.html',
  styleUrls: ['./login-restablecer-contrasena.page.scss'],
})
export class LoginRestablecerContrasenaPage implements OnInit {

  showPassword: boolean = false; // Variable para alternar la visibilidad de la contraseña

  email: string = '';
  mensaje: string = '';

  constructor(private auf: AngularFireAuth,
              private alertController: AlertController,
              private modalController: ModalController,
              private lrc: LoginRestablecerContrasenaService) { }

  ngOnInit() {
  }

  PasswordVisible() {
    this.showPassword = !this.showPassword;
  }

  enviarCorreo() {
    this.lrc.enviarCorreo(this.email).subscribe(
      (response) => {
        if (response.correoExiste) {
          this.auf.sendPasswordResetEmail(this.email);
          this.EnviarCorreoExitoso();
        } else {
          this.EnviarCorreoError();
        }
      },
      (error) => {
        console.error('Error al enviar el correo:', error);
      }
    );
  }


  async EnviarCorreoExitoso() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Correo enviado con exito!',
      message: 'Si este e-mail se encuentra vinculado a una cuenta recibirás un correo para restaurar tu contraseña.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async EnviarCorreoError() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'El correo no fue enviado',
      message: 'Verifica si estas registrado en Sense App',
      buttons: ['OK'],
    });

    await alert.present();
  }
  
  async volver() {
    await this.modalController.dismiss();
  }
  
 

}
