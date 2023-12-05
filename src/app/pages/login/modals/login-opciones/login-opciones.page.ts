import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginRegistroPage } from '../login-registro/login-registro.page';
import {LoginOpcionesService } from '../login-opciones/service/login-opciones.service';

@Component({
  selector: 'app-login-opciones',
  templateUrl: './login-opciones.page.html',
  styleUrls: ['./login-opciones.page.scss'],
})
export class LoginOpcionesPage implements OnInit {

  constructor(private modalController: ModalController,
              private loginOpciones: LoginOpcionesService
              ) { }

  ngOnInit() {
  }

  async seleccionarTipoUsuario(tipo: string) {
    // Almacenar el tipo de usuario seleccionado en el servicio
    this.loginOpciones.setTipoUsuario(tipo);
    console.log(tipo)
    const modal = await this.modalController.create({
      component: LoginRegistroPage,
      componentProps: {
        tipoUsuario: tipo
      }
    });
    return await modal.present();
  }
}
