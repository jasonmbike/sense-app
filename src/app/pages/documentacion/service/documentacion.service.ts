import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionService {

  private url = "https://www.sensecional.xyz/sense/ws"; // URL base del backend

  constructor(private http: HttpClient) { }

  enviarArchivos(archivos: FormData) {
    const url = `${this.url}?m=documentacion&f=subirArchivo`;
    return this.http.post(url, archivos);
  }
  
  

  
}
