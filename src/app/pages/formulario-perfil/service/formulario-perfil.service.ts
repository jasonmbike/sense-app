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
export class FormularioPerfilService {

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

  obtenerRegiones(): Observable<any> {
    const url = `${this.url}?m=region&f=obtenerRegiones`;
    return this.http.get<any>(url);
  }

  obtenerComunas(id_region: any): Observable<any> {
    const url = `${this.url}?m=comuna&f=obtenerComunas`;
    return this.http.post<any>(url,{id_region});
  }
  actualizarUsuario(usuario: any, tipo_user:any, datos:any): Observable<any>{
    const url = `${this.url}?m=perfil&f=actualizarUsuario`;
    return this.http.post<any>(url,{usuario, tipo_user, datos});
}
 

  obtenerGeneros(): Observable<any> {
    const url = `${this.url}?m=genero&f=obtenerGeneros`;
    return this.http.get<any>(url);
  }
}