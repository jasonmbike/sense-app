import { Component, OnInit } from '@angular/core';
import { BuscarespService } from './services/buscaresp.service';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

interface Personalidad {
  personalidad: string;
  seleccionado: boolean;
}

interface Hobbie {
  hobbie: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-buscaresp',
  templateUrl: './buscaresp.page.html',
  styleUrls: ['./buscaresp.page.scss'],
})
export class BuscarespPage implements OnInit {

  constructor(private buscarservicio: BuscarespService,public alertController: AlertController, private router: Router) { }
  expanded: boolean = false;
  expanded2: boolean = false;
  noencontrado : boolean = false;
  resultado : boolean = false;
  resultados : boolean = false;

  especialistas: any[] = [];

  imagen_perfil:any;

  ngOnInit() {
    this.cargarpersonalidadesyhobies();
  }


  tiposDeSesion: any[] = [
    { tipo: 'Presencial', seleccionado: false },
    { tipo: 'Online', seleccionado: false },
    { tipo: 'Ambas', seleccionado: false }
  ];
  
  generos: any[] = [
    { genero: 'Masculino', seleccionado: false },
    { genero: 'Femenino', seleccionado: false },
    { genero: 'Otro', seleccionado: false }
  ];

  


  showList = false;
  showList2 = false;

  personalidades: any[] = [];
  hobbies: any[] = [];

  

  toggleList() {
    this.showList = !this.showList;
    this.expanded = !this.expanded;
  }

  toggleList2() {
    this.showList2 = !this.showList2;
    this.expanded2 = !this.expanded2;
  }


  cargarpersonalidadesyhobies() {
    // Aquí puedes realizar las acciones necesarias con la hora seleccionada
    

    this.buscarservicio.getpersonalidadesyhobbies().subscribe(
      (data: any) => {
        
        if (data.success === true && data.message.length > 0) {
          this.personalidades = data.message.map((item: any) => ({ ...item, seleccionado: false })) as Personalidad[];
          this.hobbies = data.message2.map((item: any) => ({ ...item, seleccionado: false })) as Hobbie[];


        } else {
          
          // Puedes mostrar un mensaje de error al usuario si es necesario.
        }
      },
      (error: any) => {

        
        console.error('Error:', error);
        
       
        // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );
  }
  


  seleccionarChip(chip: any) {
    chip.seleccionado = !chip.seleccionado;
  }


  seleccionarChip2(tipoSeleccionado: any, array: any[]) {
    // Si el chip ya está seleccionado, deselecciónalo
    if (tipoSeleccionado.seleccionado) {
      tipoSeleccionado.seleccionado = false;
    } else {
      // Si el chip no está seleccionado, primero deselecciona todos los chips
      array.forEach(item => {
        item.seleccionado = false;
      });
  
      // Luego, selecciona el chip que fue clickeado
      tipoSeleccionado.seleccionado = true;
    }
  }
  
  seleccionarChip3(generoSeleccionado: any, array: any[]) {
    // Si el chip ya está seleccionado, deselecciónalo
    if (generoSeleccionado.seleccionado) {
      generoSeleccionado.seleccionado = false;
    } else {
      // Si el chip no está seleccionado, primero deselecciona todos los chips
      array.forEach(item => {
        item.seleccionado = false;
      });
  
      // Luego, selecciona el chip que fue clickeado
      generoSeleccionado.seleccionado = true;
    }
  }


  obtenerChipsSeleccionados() {
    const tiposDeSesionSeleccionados = this.tiposDeSesion.filter(tipo => tipo.seleccionado).map(tipo => tipo.tipo);
    const generosSeleccionados = this.generos.filter(genero => genero.seleccionado).map(genero => genero.genero);
    const personalidadesSeleccionadas = this.personalidades.filter(personalidad => personalidad.seleccionado).map(personalidad => personalidad.personalidad);
    const hobbiesSeleccionados = this.hobbies.filter(hobbie => hobbie.seleccionado).map(hobbie => hobbie.hobbie);
  
    console.log('Tipos de sesión seleccionados:', tiposDeSesionSeleccionados);
    console.log('Géneros seleccionados:', generosSeleccionados);
    console.log('Personalidades seleccionadas:', personalidadesSeleccionadas);
    console.log('Hobbies seleccionados:', hobbiesSeleccionados);

    this.buscarservicio.getespecialista(tiposDeSesionSeleccionados,generosSeleccionados,personalidadesSeleccionadas,hobbiesSeleccionados).subscribe(
      (data: any) => {
        
        if (data.success === true && data.message.length > 0) {

          console.log(data.message);

          this.noencontrado = false;
          this.especialistas = data.message;
          this.resultados = true;
          this.imagen_perfil = 'https://www.sensecional.xyz/sense/' + data.message.IMAGEN_PERFIL;
          // Verificar si hay una imagen de perfil y construir la URL completa
          if (data.message.IMAGEN_PERFIL !== undefined && data.message.IMAGEN_PERFIL !== null) {
            this.imagen_perfil = 'https://www.sensecional.xyz/sense/' + data.message.IMAGEN_PERFIL;
          } else {
            // Si no hay imagen de perfil, establecerlo a null
            this.imagen_perfil = null;
          }

          console.log(this.imagen_perfil);



        } else {
          this.resultados = false;
          this.noencontrado = true;
          
          // Puedes mostrar un mensaje de error al usuario si es necesario.
        }
      },
      (error: any) => {

        
        console.error('Error:', error);
        
       
        // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );
  }
  


  async mostrarAlerta(especialista: any) {
    const alert = await this.alertController.create({
      header: '¿Donde quieres ir?',
      buttons: [
        {
          text: 'Perfil',
          cssClass: 'custom-alert-button',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              state: {
                especialistaId: especialista.ID_ESPECIALISTA,
                visitante: 1
              },
            };
            this.router.navigate(['/perfil'], navigationExtras);
          }
        },
        {
          text: 'Agenda',
          cssClass: 'custom-alert-button',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              state: {
                especialistaId: especialista.ID_ESPECIALISTA,
              },
            };
            this.router.navigate(['/reservas'], navigationExtras);
          }
        }
      ]
    });
  
    await alert.present();
  }








}
