import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ModalController, NavController, ToastController , AlertController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { AppComponent } from 'src/app/app.component';
import { MihorarioespService } from './service/mihorarioesp.service';
import { ModalhorarioPage } from './modals/modalhorario/modalhorario.page';

@Component({
  selector: 'app-mihorarioesp',
  templateUrl: './mihorarioesp.page.html',
  styleUrls: ['./mihorarioesp.page.scss'],
})
export class MihorarioespPage implements OnInit {

  horasDisponibles: any[] = [];
  id: any;
  selectedDate: any;
  tarifa: any;
  datosesp: any;
  highlightedDates: { date: string, textColor: string, backgroundColor: string }[] = [];

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public mihorarioservicio: MihorarioespService,
    private router: Router,
    private route: ActivatedRoute,
    private appc: AppComponent,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.recuperarId();
    this.horasmarcadas();
  }




  async horasmarcadas(){

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user;
  
    this.mihorarioservicio.getHorario2(id_user).subscribe(
      (data: any) => {
        if (data.success === true && data.message.length > 0) {
          const horarioString = data.message[0].horario;


          //const horarioReservado = data.horariosReservados;
          const horarios = JSON.parse(horarioString);


        
          for (let fecha in horarios) {
            if (horarios[fecha].some((h:any) => h.disponible)) {
              this.highlightedDates.push({
                date: fecha,
                textColor: '#ffffff',
                backgroundColor: '#1CA39E',
              });
            }
          }
       
        } else {
          console.error('Error: No se encontraron datos válidos en la respuesta.');
          this.horasDisponibles = [];
          // Puedes mostrar un mensaje de error al usuario si es necesario.
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.horasDisponibles = [];
        // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );

  } else {
    console.log('No se encontraron datos del usuario en las preferencias');
    // Lógica adicional en caso de que no haya datos de usuario
  }

  }


   async onDateChange(event: Event | string) {
    if (typeof event === 'string') {
      // Si se proporciona una cadena de fecha directamente, úsala
      this.selectedDate = format(parseISO(event), 'yyyy-MM-d', { locale: es });
    } else {
      // Si es un evento, obtén la fecha del evento
      this.selectedDate = format(parseISO((<any>event).detail.value), 'yyyy-MM-d', { locale: es });
    }
    
    console.log('Fecha seleccionada:', this.selectedDate);
   
  
    //const id = 4;
    //this.id = 11;

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user;
  
    this.mihorarioservicio.getHorario2(id_user).subscribe(
      (data: any) => {
        if (data.success === true && data.message.length > 0) {
          const horarioString = data.message[0].horario;


          //const horarioReservado = data.horariosReservados;
          const horarios = JSON.parse(horarioString);


          const horarioReservado: { fecha: string, hora: string }[] = data.horariosReservados; // Tu variable horarioReservado

          console.log(horarioReservado);

          console.log('Datos exitosos:', horarios);

          if (horarioReservado !== null) {

            horarioReservado.forEach(reserva => {
                const fechaReservada = reserva.fecha;
                const horaReservada: string = reserva.hora; // Especifica el tipo como string

                if (horarios[fechaReservada]) {
                    // Si la fecha existe en horarios, busca la hora en su arreglo
                    const horasDeFecha = horarios[fechaReservada];
                    
                    horasDeFecha.forEach((hora: { hora: string; disponible: number; }) => {
                        if (hora.hora === horaReservada) {
                            // Si la hora coincide con la hora reservada, cambia su disponibilidad a 0
                            hora.disponible = 0;
                        }
                    });
                }
            });
        
            
          }
            // Recorre cada elemento en horarioReservado
            
          if (horarios[this.selectedDate]) {
            const horasDelDia = horarios[this.selectedDate];
            this.tarifa = data.message[0].tarifa;
            console.log(`Horas disponibles para el ${this.selectedDate}:`, horasDelDia);

  
            // Definir las horas disponibles para mostrar en la vista
            this.horasDisponibles = horasDelDia;
  
          } else {
             // Puedes mostrar una notificación Toast
            var mensaje = 'No hay horas disponibles para el dia seleccionado';
            this.presentToast(mensaje);
            this.horasDisponibles = [];
          }
        } else {
          console.error('Error: No se encontraron datos válidos en la respuesta.');
          this.horasDisponibles = [];
          // Puedes mostrar un mensaje de error al usuario si es necesario.
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.horasDisponibles = [];
        // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );

  } else {
    console.log('No se encontraron datos del usuario en las preferencias');
    // Lógica adicional en caso de que no haya datos de usuario
  }

  }
  


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      cssClass: 'ion-color-faq' 
    });
    toast.present();
  }

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


  async openEditModal(hora: any) {

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user;

    //this.id = 11;
    const modal = await this.modalController.create({
      component: ModalhorarioPage,
      breakpoints: [0, 0.30, 0.50],
      initialBreakpoint: 0.30,
      canDismiss: true,
      backdropDismiss: true, // Crea un componente para el modal
      componentProps: { hora: hora } // Pasa la hora actual al modal
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    
    // Aquí puedes procesar la información devuelta por el modal y actualizar la base de datos
    if (data) {

      this.mihorarioservicio.actualizarhorario(id_user,this.selectedDate,hora.hora,data.disponibilidad,data.tipoSesion).subscribe(
        (data: any) => {

          if (data.success === true && data.message.length > 0) {

            this.presentSuccessAlert('El horario se cambió correctamente.');

            this.onDateChange(this.selectedDate);


          }else {
              console.error('Error: No se encontraron datos válidos en la respuesta.');
              this.horasDisponibles = [];
              // Puedes mostrar un mensaje de error al usuario si es necesario.
            }

        },
        (error: any) => {
          console.error('Error:', error);
          
          // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
        }
        );

      console.log(data);
      // Realiza la lógica para actualizar la base de datos con los datos de "data"
      // data puede contener los nuevos valores seleccionados por el usuario
    }

  } else {
    console.log('No se encontraron datos del usuario en las preferencias');
    // Lógica adicional en caso de que no haya datos de usuario
  }
  }


  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
