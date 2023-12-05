import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }


  obtenerReservas(idUsuario: number, tipoUsuario: number): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario.toString())
      .set('tipo_usuario', tipoUsuario.toString());

    const url = `${this.url}?m=historial&f=obtenerReservas`;
    
    return this.http.get<any>(url, { params });
  }
}
