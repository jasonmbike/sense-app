import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ReservaService } from './service/reserva.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  

  horasDisponibles: any[] = [];
  id: any;
  selectedDate: any;
  tarifa: any;
  datosesp: any;
  especialistaId: string = '';
  highlightedDates: { date: string, textColor: string, backgroundColor: string }[] = [];

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public reservaservicio: ReservaService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.traeridesp();

    this.route.queryParams.subscribe(params => {
      const idFromState = this.router.getCurrentNavigation()?.extras.state?.['especialistaId'];
  
      // Verificar si idFromState no es undefined antes de asignarlo
      if (idFromState !== undefined) {
        this.especialistaId = idFromState;
      }
    });

    // for (let fecha in horarios) {
    //   if (horarios[fecha].some(h => h.disponible)) {
    //     this.highlightedDates.push({
    //       date: fecha,
    //       textColor: '#ffffff',
    //       backgroundColor: '#4caf50',
    //     });
    //   }
    //}

    this.horasmarcadas();


  }


  traeridesp() {
    this.reservaservicio.getIdEspecialista()
      .pipe(first())
      .subscribe((datosesp) => {
        if (datosesp) {
          console.log('Datos combinados en PagarPage:', datosesp);
  
          
          this.id = datosesp.id;
         
  
          console.log(this.id);
        } else {
          console.log('Los datos combinados no están disponibles.');
        }
      });
  }


  

  horasmarcadas(){

    
    if(this.id == 0){
      this.id =this.especialistaId;

    } 

    this.reservaservicio.getHorario(this.id).subscribe(
      (data: any) => {
        if (data.success === true && data.message.length > 0) {
          const horarioString = data.message[0].horario;


          //const horarioReservado = data.horariosReservados;
          const horarios = JSON.parse(horarioString);


          const horarioReservado: { fecha: string, hora: string }[] = data.horariosReservados; // Tu variable horarioReservado

          console.log(horarioReservado);

          console.log('Datos exitosos:', horarios);
          

          for (let fecha in horarios) {
            if (horarios[fecha].some((h:any) => h.disponible)) {
              this.highlightedDates.push({
                date: fecha,
                textColor: '#ffffff',
                backgroundColor: '#4caf50',
              });
            }
          }

          this.cdr.detectChanges();
            
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
   

  }


  

  onDateChange(event: Event) {
    this.selectedDate = (<any>event).detail.value;
    


    this.selectedDate = format(parseISO(this.selectedDate), 'yyyy-MM-d', { locale: es });
    
    if(this.id == 0){
      this.id =this.especialistaId;

    } 
   
    
  
    //const id = 4;
  
    this.reservaservicio.getHorario(this.id).subscribe(
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
  }
  

  
  

  reservarHorario(horaElegida: string, id: number, selectedDate: any, tarifa: number) {
    // Aquí puedes realizar las acciones necesarias con la hora seleccionada
    

    this.reservaservicio.reservaTemporal(horaElegida,id, selectedDate).subscribe(
      (data: any) => {
        
        if (data.success === true && data.message.length > 0) {
          const respuesta = data.message;

          const datosCombinados = { horaElegida, id, selectedDate };

          this.reservaservicio.updateDatosReserva = {horaElegida: horaElegida, id: id, selectedDate: selectedDate, tarifa: tarifa}
          
          console.log('Datos exitosos:', datosCombinados);

          this.router.navigate(['/pagar']);

        } else {

          var mensaje = 'Ups alguien reservo antes que tú ):<br>Intenta más tarde o prueba con otra hora ;)';
          this.presentToast(mensaje);
          console.log('HORA OCUPADA');
          
          // Puedes mostrar un mensaje de error al usuario si es necesario.
        }
      },
      (error: any) => {

        
        console.error('Error:', error);
        
       
        // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );
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


  

}
