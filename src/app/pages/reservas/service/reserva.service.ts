import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { EspecialistaService, Id } from '../../especialista/service/especialista.service';


export interface Reserva {
  horaElegida: string;
  id: number;
  selectedDate: string;
  tarifa: number;

}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  Id$: Observable<Id>;

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient,especialista: EspecialistaService) {
    this.Id$ = especialista.obtenerId;
   }


  getIdEspecialista() {
    return this.Id$;
  }

  private datosReserva: BehaviorSubject<Reserva> = new BehaviorSubject<Reserva>({horaElegida:'nada', id: 0, selectedDate: 'ninguna',tarifa:0})
  


  get obtenerDatosReserva() {
    return this.datosReserva.asObservable();
  }

  set updateDatosReserva(data: Reserva) {
    this.datosReserva.next(data);

    console.log('??',data);

  }







  getHorario(id: number): Observable<any> {
    const url = `${this.url}?m=reservas&f=getHorarios`;
    return this.http.post(url, { id })
    
  }


  reservaTemporal(horario: any, id: any, selectedDate: any): Observable<any>  {
    // Realiza una solicitud POST al backend con el horario
    const url = `${this.url}?m=reservas&f=reservaTemporal`;
    return this.http.post(url, { horario,id, selectedDate });
  }


  

}
