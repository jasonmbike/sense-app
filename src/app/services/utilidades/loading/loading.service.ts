import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading:any = null;

  constructor(public _loading_: LoadingController) { }

  async mostrar(data:any) {
    if (this.loading == null) {
      this.loading = await this._loading_.create({
        mode: 'md',
        spinner: null,
        cssClass: 'loading-contenido',
        translucent: true,
        backdropDismiss: false,
      });
      await this.loading.present();
    }
  }

  ocultar() {
    if (this.loading != null) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  async mostrarPorTresSegundos() {
    if (this.loading == null) {
      this.loading = await this._loading_.create({
        mode: 'md',
        spinner: null,
        cssClass: 'loading-contenido',
        translucent: true,
        backdropDismiss: false,
      });
      await this.loading.present();

      // Ocultar el loading después de 3 segundos
      setTimeout(() => {
        this.ocultar();
      }, 3000);
    }
  }



}
