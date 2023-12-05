import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }

  validarLogin(email: any): Observable<any> {
    
    const url = `${this.url}?m=login&f=iniciarSesion`;
    return this.http.post<any>(url, {email});
  }

}
