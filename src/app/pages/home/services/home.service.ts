import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = "https://www.sensecional.xyz/sense/ws";
  constructor(private http: HttpClient) { }


  verificarUser(id: number): Observable<any> {
    const url = `${this.url}?m=reservas&f=verificarUser`;
    return this.http.post(url, { id })
    
  }
}
