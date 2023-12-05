import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgregarhorarioService {
  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }


  guardarHorario(id_esp:any, horario:any): Observable<any> {

    const url = `${this.url}?m=reservas&f=guardarHorario`;
    return this.http.post(url, { id_esp, horario });


  }
}
