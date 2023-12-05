import { Component, OnInit } from '@angular/core';
import { HistorialService } from './service/historial.service';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public id_usuario: number = 0 ;
  public tipo_usuario: number = 0 ;
  reservas: any[] = [];
  mesFiltro: string = '';
  anioFiltro: string = '';
  opcionesAnios: number[] = [];
  opcionesMeses: any[] = [];

  constructor(private historialService: HistorialService,
              private appc: AppComponent,
              private alertController: AlertController) {
    this.opcionesAnios = this.generarOpcionesAnios();
    this.opcionesMeses = this.generarOpcionesMeses();
  }

  ngOnInit() {
    this.recuperarId().then(idUsuario => {
      if (idUsuario) {
        this.obtenerReservas(idUsuario);
      } else {
        console.error('No se pudo recuperar el ID del usuario');
      }
    });
  }

  obtenerReservas(idUsuario: number) {
    this.historialService.obtenerReservas(idUsuario, this.tipo_usuario).subscribe(
      (data) => {
        console.log('Datos de la API:', data);
  
        // Verificar si hay reservas
        if (data.success === true) {
          // Ordenar las reservas por fecha de manera descendente
          this.reservas = data.especialistas.sort((a: any, b: any) => {
            const fechaA = new Date(a.FECHA_RESERVA);
            const fechaB = new Date(b.FECHA_RESERVA);
            return fechaB.getTime() - fechaA.getTime();
          });
  
          console.log(this.reservas);
        } else {
          console.log('No hay reservas.');
          this.mostrarMensajeNoReservas();
        }
      },
      (error) => {
        console.error('Error obteniendo reservas:', error);
      }
    );
  }

  async mostrarMensajeNoReservas() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Atención!',
      message: 'Usted no cuenta con reservas realizadas',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
  
 
  

  generarOpcionesAnios(): number[] {
    const anios = [];
    const fechaActual = new Date();
    const anioInicial = fechaActual.getFullYear() - 10;
    const anioFinal = fechaActual.getFullYear() + 10;

    for (let anio = anioInicial; anio <= anioFinal; anio++) {
      anios.push(anio);
    }

    return anios;
  }

  generarOpcionesMeses(): any[] {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return nombresMeses.map((mes, index) => ({ value: ('0' + (index + 1)).slice(-2), label: mes }));
  }

  async recuperarId(): Promise<number | null> {
    const user = await this.appc.getUser();
  
    if (user) {
      const userID = user.id;
      const tipo_usuario = user.tipo_usuario;
      const email = user.email;

      this.id_usuario = userID;
      this.tipo_usuario = tipo_usuario;
      // Aquí puedes utilizar userID para acceder al ID del usuario
      console.log('id_user: '+userID);
      console.log('tipo_usuario: '+tipo_usuario);
      console.log('email: '+email);
      return userID;
    } else {
      // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
      return null;
    }
  }
 
}
