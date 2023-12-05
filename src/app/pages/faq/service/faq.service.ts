import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private url = "https://www.sensecional.xyz/sense/ws";

  constructor(private http: HttpClient) { }


  obtenerFaq(): Observable<any> {
    const url = `${this.url}?m=faq&f=obtenerFaq`;
    return this.http.get<any>(url);
  }
}
