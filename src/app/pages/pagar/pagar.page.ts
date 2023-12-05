import { Component, OnInit } from '@angular/core';
import { PagarService } from './service/pagar.service';
import { first } from 'rxjs/operators';
import { Browser } from '@capacitor/browser'
import { MenuController, ModalController, Platform } from '@ionic/angular'
import { BoletaAceptadaPage } from './modals/boleta-aceptada/boleta-aceptada.page'; 
import { BoletaRechazadaPage } from './modals/boleta-rechazada/boleta-rechazada.page';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  datosCombinados: any;
  hora: any;
  tipo: any;
  disponible: any;
  selectedDate: any;
  id: any;
  tarifa: any;
  token_ws: any;



  


  constructor(private pagarService: PagarService,private _modal_: ModalController, private appc: AppComponent) {}

  ngOnInit() {
    // Obtiene los datos del servicio
    this.recuperardatosreserva();
    //this.crearTransaccion();
    this.recuperarId();
  }


  recuperardatosreserva() {
    this.pagarService.getDatosCombinados()
      .pipe(first())
      .subscribe((datosCombinados) => {
        console.log('Datos combinazxczxxdos en PagarPage:', datosCombinados);
        if (datosCombinados) {
          console.log('Datos combinazxczxxdos en PagarPage:', datosCombinados);
  
          const horaelegida = datosCombinados.horaElegida as any;
          this.hora = horaelegida.hora;
          this.tipo = horaelegida.tipo;
          //this.disponible = horaelegida.disponible;
          this.id = datosCombinados.id;
          this.selectedDate = datosCombinados.selectedDate;
          this.tarifa = datosCombinados.tarifa;
  
          console.log('estos son los datos que se mandan: '+ this.hora,this.tipo,this.id, this.selectedDate);
        } else {
          console.log('Los datos combinados no están disponibles.');
        }
      });
  }


  getRandomInt(min: number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }




  async openBrowser() {
    // Creamos una promesa que se resolverá cuando obtengamos el token

    console.log('estos son los datos que se mandan: '+ this.hora,this.tipo,this.id, this.selectedDate);
    const randomNumber = this.getRandomInt(1, 10000);
    
    const tokenPromise = new Promise((resolve, reject) => {
      this.pagarService.enviarPago(this.tarifa, this.id,randomNumber).subscribe(
        (data: any) => {
          if (data.token.length > 0) {
            resolve(data.token);
          } else {
            reject('Token no recibido');
          }
        },
        (error: any) => {
          reject('Error:' + error);
        }
      );
    });
  
    try {
      // Esperamos a que la promesa se resuelva para obtener el token
      const token_ws = await tokenPromise;
      // Construimos la URL con el token
      const url = `https://webpay3gint.transbank.cl/webpayserver/initTransaction?token_ws=${token_ws}`;
   
  
      Browser.removeAllListeners();
      // Abrimos el navegador con la URL
      await Browser.open({ url });
      Browser.addListener('browserFinished', () => {
        // Resto de tu código

        this.verificarpago(this.id,randomNumber);

        //VERIFICAR PROBLEMA BOLETA DUPLICADA AL CERRAR EL NAVEGADOR
        
        
      });
    } catch (error) {
      console.error(error);
    }
  }


  async verificarpago(id: any, orden_compra: any) {
    console.log(id, orden_compra);
  
    const user = await this.recuperarId(); // Espera a que la Promesa se resuelva
  
    if (user !== null) {
      let id_user = user; // Declarada con let para ser accesible en todo el alcance de la función
  
      // Resto del código...
      this.pagarService.recibirResultadoDelPago2(id, orden_compra).subscribe(
        (data: any) => {
          if (data.message[0].codigo_respuesta == 0) {
            const codigoAutorizacion = data.message[0].codigo_autorizacion;
            const estado = data.message[0].estado;
            const fecha = data.message[0].fecha;
            const id = data.message[0].id;
            const idEspecialista = data.message[0].id_especialista;
            const monto = data.message[0].monto;
            const numeroTarjeta = data.message[0].numero_tarjeta;
            const ordenCompra = data.message[0].orden_compra;
            const tipoPago = data.message[0].tipo_pago;
            const estado_reserva = 5;
  
            let tipo_consulta;
  
            if (this.tipo === 'presencial') {
              tipo_consulta = 2;
            }
            if (this.tipo === 'online') {
              tipo_consulta = 1;
            }

            console.log('id: '+id_user,'fecha: '+this.selectedDate, 'hora: '+ this.hora, 'tipo_consulta: '+tipo_consulta);
  
            this.pagarService.guardarReserva(id_user, idEspecialista, this.selectedDate, this.hora, estado_reserva, tipo_consulta).subscribe(
              (data2: any) => {
                if (data2.success === true) {
                  console.log("reserva, guardada exitosamente");
                  
                } else {
                  console.log("la reserva no es true.");
                }
              }, (error: any) => {
                console.log('error:', error);
              }
            );
            this.openBoletaModalAceptar(codigoAutorizacion, fecha, monto, numeroTarjeta, ordenCompra, tipoPago);
          } else {
            // Compra rechazada, falta la lógica.
          }
          console.log(data.message);
        }, (error: any) => {
          console.log('Error:', error);
        }
      );
    } else {
      console.log('No se encontraron datos del usuario en las preferencias');
      // Lógica adicional en caso de que no haya datos de usuario
    }
  }
  
  
  
  


  
  // Tipo de pago de la transacción.
        // VD = Venta Débito.
        // VN = Venta Normal.
        // VC = Venta en cuotas.
        // SI = 3 cuotas sin interés.
        // S2 = 2 cuotas sin interés.
        // NC = N Cuotas sin interés
        // VP = Venta Prepago.



  async recuperarId(): Promise<number | null> {
    const user = await this.appc.getUser();
  
    if (user) {
      const userID = user.id;
      // Aquí puedes utilizar userID para acceder al ID del usuario
      console.log('id actual: '+ userID);
      return userID;
    } else {
      // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
      return null;
    }
  }


  public async openBoletaModalAceptar(codigoAutorizacion:any,fecha:any,monto:any,numeroTarjeta:any,ordenCompra:any,tipoPago:any) {
   
    const modal = await this._modal_.create({
      component: BoletaAceptadaPage,
      //breakpoints: [0, 0.25],
      initialBreakpoint: 0.80,
      canDismiss: true,
      backdropDismiss: false,
      componentProps: {
        codigoAutorizacion: codigoAutorizacion,
        fecha: fecha,
        monto: monto,
        numeroTarjeta: numeroTarjeta,
        ordenCompra: ordenCompra,
        tipoPago: tipoPago

      }
    });
    modal.present();
  }



  public async openBoletaModalAceptar2() {
   
    const modal = await this._modal_.create({
      component: BoletaAceptadaPage,
      //breakpoints: [0, 0.25],
      initialBreakpoint: 0.80,
      canDismiss: true,
      backdropDismiss: false,
      componentProps: {
        codigoAutorizacion: 'asda3123',
        fecha: 'adas',
        monto: 321212,
        numeroTarjeta: '34323',
        ordenCompra: 'adsdsa23',
        tipoPago: 'aaa'

      }
    });
    modal.present();
  }

  


}
