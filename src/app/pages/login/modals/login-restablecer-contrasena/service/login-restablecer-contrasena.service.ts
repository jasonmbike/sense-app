import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginRestablecerContrasenaService {

  
  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }

  enviarCorreo(email: string): Observable<any> {
    console.log("Este es el correo registrado:", email);
    const url = `${this.url}?m=login&f=verificarCorreo`;
    return this.http.post<any>(url, { email }); 
  }
}
