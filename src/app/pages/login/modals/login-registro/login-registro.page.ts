import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { LoginRegistroService } from './service/login-registro.service';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.page.html',
  styleUrls: ['./login-registro.page.scss'],
})
export class LoginRegistroPage implements OnInit {

  showPassword: boolean = false; // Variable para alternar la visibilidad de la contraseña

  tipoUsuario: string = '';
  documento: string = '';
  rut: string = '';
  nombre: string = '';
  appaterno: string = '';
  apmaterno: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  nuevaContrasena: string = ''

  constructor(
    private modalController: ModalController,
    private router: Router,
    private navParams: NavParams,
    private login_registro: LoginRegistroService,
    private alertController: AlertController,
    private auf: AngularFireAuth,
  ) {}

  PasswordVisible() {
    this.showPassword = !this.showPassword;
  }

  async volver() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    this.tipoUsuario = this.navParams.get('tipoUsuario');
  }

   registrarUsuario() {

    // Obtener los valores adecuados para cada parámetro
    const rut: number = Number(this.rut);
    const nombre = this.nombre;
    const appaterno = this.appaterno;
    const apmaterno = this.apmaterno;
    const email = this.email;
    const password = this.password;
    const telefono: number = Number(this.telefono);

        

    // Verifica si todos los campos están completos
    if (!rut || !nombre || !appaterno || !apmaterno || !email || !password || !telefono) {
      this.presentAlertErr();
      return; // Detiene la ejecución si hay campos vacíos
    }else{
       // Verifica si la contraseña tiene al menos 6 caracteres
            if (password.length < 6) {
              this.presentAlertPasswordLength();
              return;
      }
    }

    // Hashear la contraseña en el cliente antes de enviarla al backend
    const claveHasheada = CryptoJS.SHA256(password).toString();
    

    if (this.tipoUsuario === 'especialista') {
      // Almacenar en tu base de datos local
      this.login_registro
        .almacenarEspecialista(rut, nombre, appaterno, apmaterno, telefono, email, claveHasheada)
        .subscribe({
          next: (response: any) => {
            console.log('Especialista registrado correctamente:', response);
  
            // Registrar en Firebase Authentication
            this.auf.createUserWithEmailAndPassword(email, password)
              .then((firebaseResponse) => {
                console.log('Usuario registrado en Firebase:', firebaseResponse);
                this.presentAlert();
              })
              .catch((error) => {
                console.error('Error al registrar en Firebase:', error);
                this.presentAlertErr2();
              });
          },
          error: (error: any) => {
            console.error('Error al registrar especialista:', error);
            this.presentAlertErr2();
          },
        });
    } else if (this.tipoUsuario === 'cliente') {
      this.login_registro
        .almacenarUsuario(rut,nombre, appaterno, apmaterno, telefono, email, claveHasheada)
        .subscribe({
          next: (response: any) => {
            console.log('Usuario registrado correctamente:', response);
  
            // Registrar en Firebase Authentication
            this.auf.createUserWithEmailAndPassword(email, password)
              .then((firebaseResponse) => {
                console.log('Usuario registrado en Firebase:', firebaseResponse);
                this.presentAlert();
              })
              .catch((error) => {
                console.error('Error al registrar en Firebase:', error);
                this.presentAlertErr2();
              });
          },
          error: (error: any) => {
            console.error('Error al registrar usuario:', error);
            this.presentAlertErr2();
          },
        });
    }
  }

  async presentAlertErr() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Atencion!',
      message: 'Debes completar todos los campos del registro',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertErr2() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Atención!',
      message: 'Usted ya posee una cuenta registrada en Sense App',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Sensecional!',
      subHeader: 'Registro Exitoso',
      message: 'Ahora eres parte de Sense App',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertPasswordLength() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Atencion!',
      message: 'La contraseña debe tener al menos 6 caracteres por su seguridad.',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  
  
}
