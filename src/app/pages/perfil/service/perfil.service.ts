import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface Id {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }

  private enviarId: BehaviorSubject<Id> = new BehaviorSubject<Id>({ id: 0})

  get obtenerId() {
    return this.enviarId.asObservable();
  }

  set updateId(data: Id) {
    this.enviarId.next(data);

    console.log('??',data);

  }

  obtenerUsuario(id_usuario:any,tipo_usuario: any): Observable<any> {
    const url = `${this.url}?m=perfil&f=obtenerUsuario`;
    return this.http.post(url, { id_usuario,tipo_usuario })
  }


  getpersonalidadesyhobbies2(id:any): Observable<any> {
    const url = `${this.url}?m=perfil&f=getPersonalidadesYHobbies2`;
    return this.http.post(url,{id})
    
  }

  getpersonalidadesyhobbies(): Observable<any> {
    const url = `${this.url}?m=buscar&f=getPersonalidadesYHobbies`;
    return this.http.post(url,{})
    
  }

  updatepersonalidadesyhobbies(id:any,tipo:any,data:any): Observable<any> {
    const url = `${this.url}?m=perfil&f=updatePersonalidadesYHobbies`;
    return this.http.post(url,{id,tipo,data})
    
  }
}