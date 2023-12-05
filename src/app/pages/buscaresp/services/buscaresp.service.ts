import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarespService {

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }


  getpersonalidadesyhobbies(): Observable<any> {
    const url = `${this.url}?m=buscar&f=getPersonalidadesYHobbies`;
    return this.http.post(url,{})
    
  }

  getespecialista(tiposesion: any, tipogenero: any,personalidadesSeleccionadas: any,hobbiesSeleccionados: any): Observable<any> {
    const url = `${this.url}?m=buscar&f=getespecialista`;
    return this.http.post(url,{tiposesion,tipogenero,personalidadesSeleccionadas,hobbiesSeleccionados})
    
  }

}
