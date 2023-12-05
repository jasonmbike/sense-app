import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MihorarioespService {

  private url = "https://www.sensecional.xyz/sense/ws";
  constructor(private http: HttpClient) { }



  getHorario2(id: number): Observable<any> {
    const url = `${this.url}?m=reservas&f=getHorarios2`;
    return this.http.post(url, { id })
    
  }

  actualizarhorario(id: number,fecha: any, hora:any, disponibilidad: any, tiposesion: any): Observable<any> {
    const url = `${this.url}?m=reservas&f=actualizarhorario`;
    return this.http.post(url, { id,fecha,hora,disponibilidad,tiposesion})
    
  }
}
