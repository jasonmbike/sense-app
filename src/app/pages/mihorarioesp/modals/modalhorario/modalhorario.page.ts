import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalhorario',
  templateUrl: './modalhorario.page.html',
  styleUrls: ['./modalhorario.page.scss'],
})
export class ModalhorarioPage implements OnInit {

  @Input() hora: any;
  // Otras propiedades necesarias para el modal
  disponibilidad: string | undefined;
  tipoSesion: string | undefined;


  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Inicializar propiedades según sea necesario
    this.disponibilidad = this.hora.disponible === 1 ? 'disponible' : 'no disponible';
    this.tipoSesion = this.hora.tipo;
  }

  dismiss() {
    this.modalController.dismiss(); // Cierra el modal sin enviar datos
  }

  saveChanges() {
    // Aquí puedes procesar los cambios y enviarlos de vuelta al componente principal
    const newData = {
      disponibilidad: this.disponibilidad,
      tipoSesion: this.tipoSesion,
      hora: this.hora.hora
    };

    this.modalController.dismiss(newData);
  }

}
