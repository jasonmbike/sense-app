import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginOpcionesService {

  private tipoUsuario: string = '';

  setTipoUsuario(tipo: string) {
    this.tipoUsuario = tipo;
  }

  getTipoUsuario(): string {
    return this.tipoUsuario;
    
  }
 
}
