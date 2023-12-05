import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSelect } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { addDays, format } from 'date-fns';
import { AgregarhorarioService } from './service/agregarhorario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-agregarhorario',
  templateUrl: './agregarhorario.page.html',
  styleUrls: ['./agregarhorario.page.scss'],
})
export class AgregarhorarioPage implements OnInit {
  hours: string[] = []; // Puedes llenar esto con las horas que necesites
  @ViewChild('mySelect', { static: false }) mySelect: IonSelect | undefined;
  
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedStartTime: { [key: string]: string } = {};
  selectedEndTime: { [key: string]: string } = {};
  selectedDuration: number | null = null;
  DuracionEntreSesiones : number | null = null;
  areSelectorsDisabled: { [key: string]: boolean } = {};
  selectedDay: string | null = null;
  //schedule: { [key: string]: { hora: string, tipo: string, disponible: number }[] } = {};
  
  expandedDays: { [key: string]: boolean } = {};
  sessionsPerDay: number = 0;
  dayTipoSelections: { [key: string]: { tipoDia: string, tiposSesion: number[] } } = {};
  tiposDeSesion: string[] = ['presencial', 'online'];
  sessionTipoSelections: { [key: string]: { tipoDia: string; tiposSesion: string[] } } = {};
  showTopSection: boolean = true;
  showBottomSection: boolean = false;
  showNextButton: boolean = true;
  showThirdSection: boolean = false;
  selectedMonths: number | null = null;
  selectedWeeks: number | null = null;
  generatedSchedule: any = {};

  schedule: { [key: string]: { hora: string, tipo: string, disponible: number }[] } = {};
  


  // baseSchedule: { [key: string]: { hora: string; tipo: string; disponible: number }[] } = {
  //   "Lunes": [
  //     { "hora": "09:00-10:00", "tipo": "", "disponible": 1 },
  //     { "hora": "10:15-11:15", "tipo": "", "disponible": 1 },
  //     { "hora": "11:30-12:30", "tipo": "", "disponible": 1 },
  //     { "hora": "12:45-13:45", "tipo": "", "disponible": 1 },
  //     { "hora": "14:00-15:00", "tipo": "", "disponible": 1 },
  //     { "hora": "15:15-16:15", "tipo": "", "disponible": 1 },
  //     { "hora": "16:30-17:30", "tipo": "", "disponible": 1 }
  //   ],
  //   "Martes": [
  //     { "hora": "09:00-10:00", "tipo": "", "disponible": 1 }
  //   ],
  //   "Miércoles": [
  //     { "hora": "09:00-10:00", "tipo": "", "disponible": 1 },
  //     { "hora": "10:15-11:15", "tipo": "", "disponible": 1 },
  //     { "hora": "11:30-12:30", "tipo": "", "disponible": 1 },
  //     { "hora": "12:45-13:45", "tipo": "", "disponible": 1 },
  //     { "hora": "14:00-15:00", "tipo": "", "disponible": 1 },
  //     { "hora": "15:15-16:15", "tipo": "", "disponible": 1 },
  //     { "hora": "16:30-17:30", "tipo": "", "disponible": 1 }
  //   ],
  //   "Jueves": [
  //     { "hora": "09:00-10:00", "tipo": "", "disponible": 1 },
  //     { "hora": "10:15-11:15", "tipo": "", "disponible": 1 },
  //     { "hora": "11:30-12:30", "tipo": "", "disponible": 1 },
  //     { "hora": "12:45-13:45", "tipo": "", "disponible": 1 },
  //     { "hora": "14:00-15:00", "tipo": "", "disponible": 1 },
  //     { "hora": "15:15-16:15", "tipo": "", "disponible": 1 },
  //     { "hora": "16:30-17:30", "tipo": "", "disponible": 1 }
  //   ],
    
  //   "Sábado": [
      
  //     { "hora": "10:15-11:15", "tipo": "", "disponible": 1 },
  //     { "hora": "11:30-12:30", "tipo": "", "disponible": 1 },
  //     { "hora": "12:45-13:45", "tipo": "", "disponible": 1 },
      
  //     { "hora": "15:15-16:15", "tipo": "", "disponible": 1 },
  //     { "hora": "16:30-17:30", "tipo": "", "disponible": 1 }
  //   ]
  // };

  

  


  constructor(private alertController: AlertController,private agregarhorarioservice: AgregarhorarioService,private router: Router,private appc: AppComponent) { }

  ngOnInit() {
    this.initializeHours();
    
    this.initializeSelectedTimes();
    this.initializeExpandedDays();
    this.recuperarId();
    
    
  }


  initializeHours() {
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      this.hours.push(hour + ':00');
      this.hours.push(hour + ':30');
    }
  }

  initializeSelectedTimes() {
    for (const day of this.daysOfWeek) {
      this.selectedStartTime[day] = '';
      this.selectedEndTime[day] = '';
      this.sessionTipoSelections[day] = {
        tipoDia: '', // Valor predeterminado
        tiposSesion: Array.from({ length: this.sessionsPerDay }, () => ''),
      };
    }
  }

  async validateTimeRange(day: string) {
    const validationResult = this.isValidTimeRange(day);
  
    if (validationResult !== 'success') {
      let errorMessage = '';
      switch (validationResult) {
        case 'endTimeBeforeStartTime':
          errorMessage = `La hora de finalización debe ser mayor a la hora de inicio.`;
          break;
        case 'durationExceedsAvailableTime':
          errorMessage = `El intervalo entre inicio y fin debe ser mayor a la duracion de una sesion.`;
          break;
        default:
          errorMessage = `Verifica el rango de tiempo y la duración.`;
          break;
      }
  
      await this.showAlert(`Error en ${day}`, errorMessage);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  isValidTimeRange(day: string): 'success' | 'endTimeBeforeStartTime' | 'durationExceedsAvailableTime' {
    const startTimeString = this.selectedStartTime[day];
    const endTimeString = this.selectedEndTime[day];
    const startTime = this.parseTimeString(startTimeString);
    const endTime = this.parseTimeString(endTimeString);
    var duration = this.selectedDuration;
  
    const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();

    if (duration === null) {
      // Handle the case where duration is null (e.g., show an error or return an appropriate value)
      duration = 0;
    }

  
    if (endTime <= startTime) {
      // La hora de finalización es menor que la hora de inicio
      return 'endTimeBeforeStartTime';
    }
  
    const intervalMinutes = endTimeMinutes - startTimeMinutes;
    if (intervalMinutes < duration) {
      // El intervalo entre inicio y fin es menor que la duración
      return 'durationExceedsAvailableTime';
    }
  
    return 'success';
  }

  parseTimeString(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
        console.log('Formato de horas incorrecto:', hours, minutes);
        return new Date(); // O devuelve una fecha predeterminada o maneja el error de otra manera
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  toggleDaySelector(day: string) {
    // Cambiar entre habilitado y deshabilitado para el día y sus selectores
    this.areSelectorsDisabled[day] = !this.areSelectorsDisabled[day];
    if (this.areSelectorsDisabled[day]) {
      // Si se deshabilita, también puedes restablecer las horas seleccionadas para ese día
      //this.selectedStartTime[day] = '';
      //this.selectedEndTime[day] = '';
    }
  }


  async copyHoursToAllDays(sourceDay: string) {
    const startTime = this.selectedStartTime[sourceDay];
    const endTime = this.selectedEndTime[sourceDay];
  
    const alert = await this.alertController.create({
      header: 'Confirmar copia',
      message: `¿Deseas copiar las horas de ${sourceDay} a todos los demás días?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Copia cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // Copiar las horas a todos los demás días
            for (const day of this.daysOfWeek) {
              if (day !== sourceDay) {
                this.selectedStartTime[day] = startTime;
                this.selectedEndTime[day] = endTime;
              }
            }
            console.log('Horas copiadas con éxito');
          }
        }
      ]
    });
  
    await alert.present();
  }

  

  // generateScheduleJSON(): { [key: string]: { hora: string, tipo: string, disponible: number }[] } {
  //   const schedule: { [key: string]: { hora: string, tipo: string, disponible: number }[] } = {};
  
  //   for (const day of this.daysOfWeek) {
  //       const startTime = this.selectedStartTime[day];
  //       const endTime = this.selectedEndTime[day];
  //       const duration = this.selectedDuration;
  //       const margin = this.DuracionEntreSesiones;
  
  //       if (!startTime || !endTime || duration === null || margin === null) {
  //           // Manejar el caso donde falta información
  //           continue;
  //       }
  
  //       const daySchedule: { hora: string, tipo: string, disponible: number }[] = [];
  //       let currentTime = this.parseTimeString(startTime);
  //       const endTimeOfDay = this.parseTimeString(endTime);
  
  //       while (currentTime <= endTimeOfDay) {
  //         const startTimeClone = this.cloneDate(currentTime);
  //         const endTimeClone = this.addMinutes(startTimeClone, duration);
          
  //         // Asegúrate de que la hora de inicio de la siguiente sesión no exceda el límite de finalización del día
  //         if (endTimeClone.getHours() < endTimeOfDay.getHours() || (endTimeClone.getHours() === endTimeOfDay.getHours() && endTimeClone.getMinutes() <= endTimeOfDay.getMinutes())) {
  //             const timeString = `${this.formatTime(startTimeClone)}-${this.formatTime(endTimeClone)}`;
  //             daySchedule.push({ hora: timeString, tipo: '', disponible: 1 });
  //         }
          
  //         currentTime = this.addMinutes(endTimeClone, margin);
  //       }
  
  //       schedule[day] = daySchedule;
  //   }
  
  //   console.log(schedule);
  //   return schedule;
  // }


  generateScheduleJSON(): { [key: string]: { hora: string, tipo: string, disponible: number }[] } {
    //const schedule: { [key: string]: { hora: string, tipo: string, disponible: number }[] } = {};
  
    for (const day of this.daysOfWeek) {
      if (!this.areSelectorsDisabled[day]) {
        // Solo procesa el día si el selector no está deshabilitado
        const startTime = this.selectedStartTime[day];
        const endTime = this.selectedEndTime[day];
        const duration = this.selectedDuration;
        const margin = this.DuracionEntreSesiones;
  
        if (!startTime || !endTime || duration === null || margin === null) {
          // Manejar el caso donde falta información
          continue;
        }
  
        const daySchedule: { hora: string, tipo: string, disponible: number }[] = [];
        let currentTime = this.parseTimeString(startTime);
        const endTimeOfDay = this.parseTimeString(endTime);
  
        while (currentTime <= endTimeOfDay) {
          const startTimeClone = this.cloneDate(currentTime);
          const endTimeClone = this.addMinutes(startTimeClone, duration);
  
          // Asegúrate de que la hora de inicio de la siguiente sesión no exceda el límite de finalización del día
          if (endTimeClone.getHours() < endTimeOfDay.getHours() || (endTimeClone.getHours() === endTimeOfDay.getHours() && endTimeClone.getMinutes() <= endTimeOfDay.getMinutes())) {
            const timeString = `${this.formatTime(startTimeClone)}-${this.formatTime(endTimeClone)}`;
            daySchedule.push({ hora: timeString, tipo: '', disponible: 1 });
          }
  
          currentTime = this.addMinutes(endTimeClone, margin);
        }
  
        this.schedule[day] = daySchedule;
      }
    }
  
    console.log(this.schedule);
    return this.schedule;
  }

cloneDate(date: Date): Date {
  return new Date(date.getTime());
}

  
  
  
  formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }


  generarhorario() {
    // Verifica si todos los selectores tienen datos antes de generar el horario
    if (this.verificarDatos()) {
      this.schedule = this.generateScheduleJSON();
      this.showTopSection = false;
      this.siguiente();
    } else {
      // Muestra una alerta o mensaje indicando que faltan datos
      this.showAlert('Datos incompletos', 'Por favor, complete todos los selectores antes de continuar.');
    }
  }

  mostrarTopSection() {
    this.showTopSection = true;
  }

  mostrarBottomSection() {
    this.showBottomSection = true;
    
  }

  ocultarBottomSection() {
    this.showBottomSection = false;
  }

  mostrarterceraseccion() {
    if (this.showBottomSection) {
      this.showThirdSection = true;
      this.showBottomSection = false;
    }
  }

  ocultarThirdSection() {
    this.showThirdSection = false;
  }
  
 

  


  

  initializeExpandedDays() {
    for (const day of this.daysOfWeek) {
      this.expandedDays[day] = false;
    }
  }

  toggleDay(day: string) {
    this.expandedDays[day] = !this.expandedDays[day];
  
    if (this.expandedDays[day]) {
      // Actualiza el tipo del día al expandirse
      const selectedTipoDia = this.dayTipoSelections[day] ? this.dayTipoSelections[day].tipoDia : null;



  
      // Actualiza los tipos de todas las sesiones para ese día
      if (selectedTipoDia) {
        this.sessionTipoSelections[day].tiposSesion.forEach((_, i) => {
          this.sessionTipoSelections[day].tiposSesion[i] = selectedTipoDia;
        });
        //this.updateSchedule(day);
      }
    }
  }
  
  changeDayType(day: string) {
    const newTipo = this.sessionTipoSelections[day].tipoDia;
    
    // Actualiza el tipo del día completo
    this.schedule[day].forEach(session => {
      session.tipo = newTipo;
    });
  
    // Actualiza los tipos de las sesiones individuales
    this.sessionTipoSelections[day].tiposSesion = this.schedule[day].map(session => session.tipo);
  }

  updateSchedule(day: string, index: number) {
    const newTipo = this.sessionTipoSelections[day].tiposSesion[index];
    this.schedule[day][index].tipo = newTipo;
  }

  verhorario() {
  
      // Aquí puedes llamar a tu función o lógica para generar el JSON
      console.log(this.schedule);
   
  }

  verificarDatos(): boolean {
    // Verifica si se cumplen las condiciones para avanzar
    return (
      this.selectedDuration !== null &&
      this.DuracionEntreSesiones !== null &&
      Object.keys(this.selectedStartTime).every(day =>
        this.areSelectorsDisabled[day] || this.selectedStartTime[day] !== ''
      ) &&
      Object.keys(this.selectedEndTime).every(day =>
        this.areSelectorsDisabled[day] || this.selectedEndTime[day] !== ''
      )
    );
  }


  getDaysWithSchedule(): string[] {
    // Filtra los días que tienen un horario asociado
    return this.daysOfWeek.filter(day => this.schedule[day] && this.schedule[day].length > 0);
  }

  siguiente() {
    // Restablece todas las selecciones de tipo de sesión a una cadena vacía
    for (let day in this.sessionTipoSelections) {
      if (this.sessionTipoSelections.hasOwnProperty(day)) {
        this.sessionTipoSelections[day].tipoDia = '';
        this.sessionTipoSelections[day].tiposSesion = this.sessionTipoSelections[day].tiposSesion.map(() => '');
      }
    }
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




  async generarHorariofinal(): Promise<void> {
    let totalDays = 0;

    if (this.selectedMonths === null && this.selectedWeeks === null) {
      this.showAlert('Repeticion no asignada','Por favor, Seleccione almenos un mes o una semana.');
      return;
    }

  
    if (this.selectedMonths) {
      totalDays += this.selectedMonths * 30; // Aproximadamente 30 días en un mes
    }
    if (this.selectedWeeks) {
      totalDays += this.selectedWeeks * 7; // 7 días en una semana
    }

    // Crea el horario final
    let finalSchedule: { [key: string]: { hora: string; tipo: string; disponible: number }[] } = {};
    for (let i = 0; i < totalDays; i++) {
      // Calcula la fecha del día actual
      let currentDate = addDays(new Date(), i);
      let dayOfWeek = currentDate.toLocaleString('es-ES', { weekday: 'long' });
      dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

      // Si el horario base incluye el día de la semana actual, añádelo al horario final
      if (this.schedule[dayOfWeek]) {
        finalSchedule[format(currentDate, 'yyyy-MM-dd')] = this.schedule[dayOfWeek];
      }

      // Si el horario base incluye el día de la semana actual, añádelo al horario final
      if (this.schedule[dayOfWeek]) {
        finalSchedule[format(currentDate, 'yyyy-MM-dd')] = this.schedule[dayOfWeek];
      }
    }

    console.log(finalSchedule);

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user;
     //var id_user = 11;

    this.agregarhorarioservice.guardarHorario(id_user, finalSchedule).subscribe(
      (data: any) => {
        
        if (data.success === true && data.message.length > 0) {
                       
          this.showAlert('Sensecional','Horario creado con exito');

          this.router.navigate(['/home']);

        } else {

          
          console.log('HORA OCUPADA');
          
          // Puedes mostrar un mensaje de error al usuario si es necesario.
        }
      },
      (error: any) => {

        
        console.error('Error:', error);
        
       
        // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
      }
    )
  } else {
    console.log('No se encontraron datos del usuario en las preferencias');
    // Lógica adicional en caso de que no haya datos de usuario
  }


  }



  
  
  

 

  
  
}
