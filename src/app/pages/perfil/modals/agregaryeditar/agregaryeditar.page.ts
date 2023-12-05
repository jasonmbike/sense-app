import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregaryeditar',
  templateUrl: './agregaryeditar.page.html',
  styleUrls: ['./agregaryeditar.page.scss'],
})
export class AgregaryeditarPage implements OnInit {


  expanded: boolean = false;
  expanded2: boolean = false;
  personalidadess: boolean = false;
  hobbiess: boolean = false;

  @Input() personalidades: any;
  @Input() hobbies: any;
  @Input() id: any;


  selectedChips: any[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if(this.id == 1) {
      this.hobbiess = false;
      this.personalidadess= true;

    } else {
      this.personalidadess= false;
      this.hobbiess = true;
    }

  }

  dismiss() {
    this.modalController.dismiss();
    this.hobbiess = false;
    this.personalidadess= false; // Cierra el modal sin enviar datos
    
  }



  

  seleccionarChip(chip: any) {
    chip.seleccionado = !chip.seleccionado;
  }



  saveChanges() {
    // Filtra los chips seleccionados

    if(this.id == 1) {
      this.selectedChips = this.personalidades.filter((p: any) => p.seleccionado);

    } else {
      this.selectedChips = this.hobbies.filter((p: any) => p.seleccionado);

    }
    

    // Agrega el id para identificar si son personalidades o hobbies
    

    // Cierra el modal y envía los datos al componente principal
    this.modalController.dismiss(this.selectedChips);
  }
}
