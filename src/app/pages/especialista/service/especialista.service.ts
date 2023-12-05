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
export class EspecialistaService {

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

  obtenerEspecialistas(): Observable<any> {
    const url = `${this.url}?m=especialista&f=obtenerEspecialistas`;
    return this.http.get<any>(url);
  }
}
