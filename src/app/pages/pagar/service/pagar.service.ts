import { Injectable } from '@angular/core';
import { Reserva,ReservaService } from '../../reservas/service/reserva.service'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagarService {

  private url = "https://www.sensecional.xyz/sense/ws";

  
  data$: Observable<Reserva>;

  constructor(reservaService: ReservaService,private http: HttpClient) {
    this.data$ = reservaService.obtenerDatosReserva;
   
  }

  // Método para que otros componentes accedan a los datos
  getDatosCombinados() {
    return this.data$;
  }


  enviarPago(tarifa: any, id: any, orden_compra: any): Observable<any>  {
    // Realiza una solicitud POST al backend con el horario
    const url = `${this.url}?m=reservas&f=crearTransaccion`;
    return this.http.post(url, { tarifa,id, orden_compra });
  }

  recibirResultadoDelPago(id:any, orden_compra:any): Observable<any> {

    const url = `${this.url}?m=reservas&f=pagoCompletado`;
    return this.http.post(url, { id, orden_compra });


  }


  recibirResultadoDelPago2(id:any, orden_compra:any): Observable<any> {

    const url = `${this.url}?m=reservas&f=pagoCompletado2`;
    return this.http.post(url, { id, orden_compra });


  }


  guardarReserva(id_usuario:any, id_especialista:any, fecha:any, hora:any, id_estado:any, tipo_consulta:any): Observable<any> {
    const url = `${this.url}?m=reservas&f=guardarReserva`;
    return this.http.post(url, { id_usuario,id_especialista,fecha,hora,id_estado,tipo_consulta });
  }


}
