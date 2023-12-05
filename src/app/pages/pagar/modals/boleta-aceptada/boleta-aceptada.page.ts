import { Component, OnInit ,Input} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular'


@Component({
  selector: 'app-boleta-aceptada',
  templateUrl: './boleta-aceptada.page.html',
  styleUrls: ['./boleta-aceptada.page.scss'],
})
export class BoletaAceptadaPage implements OnInit {

@Input() process : number | undefined;
@Input() codigoAutorizacion: string | undefined;
@Input() fecha: string | undefined;
@Input() monto: number | undefined;
@Input() numeroTarjeta: string | undefined;
@Input() ordenCompra: string | undefined;
@Input() tipoPago: string | undefined;

  constructor(private router: Router, private _modal_: ModalController) { }

  ngOnInit() {
  }


  async regresar() {


    await this._modal_.dismiss();

    const navigationExtras: NavigationExtras = {
      queryParams: { refresh: new Date().getTime() } // Agrega un parámetro "refresh" con la hora actual
    };

    this.router.navigate(['/home'],navigationExtras)
    
  }
 

}
