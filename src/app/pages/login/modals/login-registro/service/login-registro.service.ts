import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistroService {

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }

  almacenarUsuario(rut: number, nombre: string, appaterno: string, apmaterno: string, 
                  telefono: number, email: string, password: string): Observable<any> {
    const url = `${this.url}?m=login&f=almacenarUsuario`; 
    const data = {
      rut: rut,
      nombre: nombre,
      appaterno: appaterno,
      apmaterno: apmaterno,
      telefono: telefono,
      email: email,
      clave: password
    };

    return this.http.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  almacenarEspecialista(rut: number, nombre: string, appaterno: string, apmaterno: string, 
                       telefono: number, email: string, password: string): Observable<any> {
    const url = `${this.url}?m=login&f=almacenarEspecialista`; 
    const data = {
      rut: rut,
      nombre: nombre,
      appaterno: appaterno,
      apmaterno: apmaterno,
      telefono: telefono,
      email: email,
      clave: password
    };

    return this.http.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
    
  }

  verificarUsuarioExistente(email: string): Observable<boolean> {
    const url = `${this.url}?m=login&f=verificarUsuario`;
    return this.http.post<boolean>(url, { email });
  }

  
}
