import { Component, OnInit } from '@angular/core';
import { EspecialistaService } from './service/especialista.service';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


interface Especialista {
  ID_ESPECIALISTA:number;
  NOMBRE_ESPECIALISTA: string;
  AP_PATERNO_ESPECIALISTA: string;
  AP_MATERNO_ESPECIALISTA: string;
  EMAIL_ESPECIALISTA: string;
  EDAD_ESPECIALISTA: number;
  NACIONALIDAD_ESPECIALISTA: string;
  PUNTUACION_ESPECIALISTA: number;
  IMAGEN_PERFIL?: string;
  stars: string[];  // Añadimos la propiedad 'stars' opcional
}



@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.page.html',
  styleUrls: ['./especialista.page.scss'],
})
export class EspecialistaPage implements OnInit {
  especialistas: Especialista[] = [];


  constructor(private espSev: EspecialistaService,
              private Router: Router,
              private toastController: ToastController) { }

 


  ngOnInit(): void {
    this.obtenerEspecialistas();
  }

  

  obtenerEspecialistas() {
    this.espSev.obtenerEspecialistas().subscribe(
      (response) => {
        if (response.success) {
          this.especialistas = response.especialistas;
          this.especialistas.forEach((especialista) => {
            especialista.stars = this.generateStars(especialista.PUNTUACION_ESPECIALISTA);
          });
          console.log('Especialistas obtenidos correctamente:', this.especialistas);
        } else {
          console.error('No se pudieron obtener los especialistas:', response.message);
        }
      },
      (error) => {
        console.error('Error al obtener los especialistas:', error);
      }
    );
  }
  

  generateStars(puntuacion: number): string[] {
    const starsArray = Array(5).fill('star-outline');  // Inicializa todas las estrellas como vacías
    for (let i = 0; i < puntuacion; i++) {
      starsArray[i] = 'star';  // Marca como completadas las estrellas correspondientes a la puntuación
    }
    return starsArray;
  }
  
  agendarHora(idEspecialista: number) {
    this.espSev.updateId = { id: idEspecialista };
    this.Router.navigate(['/reservas']);
  }
  
  async onIonInfinite(ev: any) {
    const startTime = new Date().getTime(); // Guardamos el tiempo de inicio
  
    try {
      // Simulamos la carga de datos
       this.obtenerEspecialistas();
  
      const endTime = new Date().getTime(); // Guardamos el tiempo actual
      const elapsedTime = endTime - startTime; // Calculamos el tiempo transcurrido
  
      // Si ha pasado más de 5 segundos desde el inicio
      if (elapsedTime >= 5000) {
        (ev as InfiniteScrollCustomEvent).target.complete();
      } else {
        // Si aún no ha pasado el tiempo, esperamos el tiempo restante
        const remainingTime = 5000 - elapsedTime;
        setTimeout(() => {
          (ev as InfiniteScrollCustomEvent).target.complete();
  
          // Muestra el toast después de que la carga ha concluido
          this.mostrarToastNoEspecialistas();
        }, remainingTime);
      }
    } catch (error) {
      console.error('Error al obtener más especialistas:', error);
      // Completa el evento en caso de error también
      (ev as InfiniteScrollCustomEvent).target.complete();
  
      // Muestra el toast en caso de error
      this.mostrarToastNoEspecialistas();
    }
  }
  
  
  async mostrarToastNoEspecialistas() {
    const toast = await this.toastController.create({
      message: 'No hay más especialistas para mostrar.',
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast
      color: 'danger', // Color del toast
    });
  
    await toast.present();
  }
  
  

  
}
