import { Component, OnInit } from '@angular/core';
import { PerfilService } from './service/perfil.service';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController ,AlertController } from '@ionic/angular';
import { AgregaryeditarPage } from './modals/agregaryeditar/agregaryeditar.page';

interface Personalidad {
  personalidad: string;
  seleccionado: boolean;
}

interface Hobbie {
  hobbie: string;
  seleccionado: boolean;
}


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  id_usuario : any;
  nombre_usuario: any;
  ap_paterno_usuario: any;
  ap_materno_usuario: any;
  email_usuario: any;
  edad_usuario: any;
  nacionalidad_usuario:any;
  direccion_usuario: any;
  rut_usuario: any;
  celular_usuario: any;
  imagen_perfil: any;
  profile: any;
  id_region: any;
  id_comuna: any;
  personalidades: any[] = [];
  hobbies: any[] = [];
  personalidades2: any[] = [];
  hobbies2: any[] = [];
  tipo_usuario = 0;

  especialistaId: string = '';
  visitante = 0;

  constructor(private perfil: PerfilService,
              private appc: AppComponent,
              private router: Router,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private alertController: AlertController) { }



  ngOnInit() {
    //this.appc.getUser():
    this.obtenerPerfil();

    this.route.queryParams.subscribe(params => {
      const idFromState = this.router.getCurrentNavigation()?.extras.state?.['especialistaId'];
      const idFromState2 = this.router.getCurrentNavigation()?.extras.state?.['visitante'];
  
      // Verificar si idFromState no es undefined antes de asignarlo
      if (idFromState !== undefined) {
        this.especialistaId = idFromState;
      }

      if (idFromState2 !== undefined) {
        this.visitante = idFromState2;
      }
    });

    this.cargarpersonalidadesyhobies();
  }

  ionViewWillEnter() {
    // Este código se ejecutará cada vez que la página esté a punto de mostrarse
    this.obtenerPerfil();
  }


   async obtenerPerfil() {

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user.id;
      let tipo_user = user.tipo_usuario;

      

      if(this.visitante == 1){
        id_user = this.especialistaId;
        tipo_user = 1;
  
      }

      console.log(id_user);
    this.perfil.obtenerUsuario(id_user, tipo_user).subscribe(
      (response) => {

        if (response.success) {
          

          if (response.usuarios[0].ID_TIPO_USUARIO == 1) {
            this.id_usuario = response.usuarios[0].ID_ESPECIALISTA;
            this.nombre_usuario = response.usuarios[0].NOMBRE_ESPECIALISTA;
            this.ap_paterno_usuario = response.usuarios[0].AP_PATERNO_ESPECIALISTA;
            this.ap_materno_usuario = response.usuarios[0].AP_MATERNO_ESPECIALISTA;
            this.email_usuario = response.usuarios[0].EMAIL_ESPECIALISTA;
            this.edad_usuario = response.usuarios[0].EDAD_ESPECIALISTA;
            this.nacionalidad_usuario = response.usuarios[0].NACIONALIDAD_ESPECIALISTA ?? 'Nacionalidad no especificada';
            this.direccion_usuario = response.usuarios[0].DIRECCION;
            this.rut_usuario = response.usuarios[0].RUT;
            this.celular_usuario = response.usuarios[0].CELULAR;
            this.id_region = response.usuarios[0].REGION ?? 'Región no especificada';
            this.id_comuna = response.usuarios[0].COMUNA ?? 'Comuna no especificada';
            this.imagen_perfil = 'https://www.sensecional.xyz/sense/' + response.usuarios[0].IMAGEN_PERFIL;    
            // Verificar si la imagen_perfil es null antes de construir la URL completa
            if (this.imagen_perfil == 'https://www.sensecional.xyz/sense/null') {
              this.imagen_perfil = null;
              }    
          } else {
            this.id_usuario = response.usuarios[0].ID_USUARIO;
            this.nombre_usuario = response.usuarios[0].NOMBRE_USUARIO;
            this.ap_paterno_usuario = response.usuarios[0].AP_PATERNO_USUARIO;
            this.ap_materno_usuario = response.usuarios[0].AP_MATERNO_USUARIO;
            this.email_usuario = response.usuarios[0].EMAIL_USUARIO;
            this.edad_usuario = response.usuarios[0].EDAD_USUARIO;
            this.nacionalidad_usuario = response.usuarios[0].NACIONALIDAD_USUARIO ?? 'Nacionalidad no especificada';
            this.direccion_usuario = response.usuarios[0].DIRECCION_USUARIO;
            this.rut_usuario = response.usuarios[0].RUT_USUARIO;
            this.celular_usuario = response.usuarios[0].CELULAR_USUARIO;
            this.id_region = response.usuarios[0].REGION ?? 'Región no especificada';
            this.id_comuna = response.usuarios[0].COMUNA ?? 'Comuna no especificada';
            this.imagen_perfil = 'https://www.sensecional.xyz/sense/' + response.usuarios[0].IMAGEN_PERFIL;
            // Verificar si la imagen_perfil es null antes de construir la URL completa
            if (this.imagen_perfil == 'https://www.sensecional.xyz/sense/null') {
              this.imagen_perfil = null;
              }
          }          
          console.log("imagen de perfil",  this.imagen_perfil);

        } else {
          console.error('No se pudieron obtener los usuarios:', response.message);
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

  } else {
    console.log('No se encontraron datos del usuario en las preferencias');
    // Lógica adicional en caso de que no haya datos de usuario
  }
    
  }

  dataURI(imageString: string): string {
    return 'data:image/jpeg;base64,' + imageString;
  }
  

  async recuperarId(): Promise<any | null> {
    const user = await this.appc.getUser();
  
    if (user) {
      const userID = user.id;
      const tipo_usuario = user.tipo_usuario;

      this.tipo_usuario = tipo_usuario;

      // Aquí puedes utilizar userID para acceder al ID del usuario
      console.log('id actual: '+ userID);
      console.log('tipo usuario:  '+ tipo_usuario);

      return user;
    } else {
      // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
      return null;
    }
  }



  async cargarpersonalidadesyhobies() {
    // Aquí puedes realizar las acciones necesarias con la hora seleccionada

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user.id;
      let tipo_user = user.tipo_usuario;
    

      this.perfil.getpersonalidadesyhobbies2(id_user).subscribe(
        (data: any) => {
          
          if (data.success === true) {
            this.personalidades = data.message;
            this.hobbies = data.message2;


          } else {
            
            // Puedes mostrar un mensaje de error al usuario si es necesario.
          }
        },
        (error: any) => {

          
          console.error('Error:', error);
          
        
          // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
        }
      )


    } else {
      console.log('No se encontraron datos del usuario en las preferencias');
      // Lógica adicional en caso de que no haya datos de usuario
    }
  }



  async abrirModal(id: any) {
    try {
      const data2 = await this.perfil.getpersonalidadesyhobbies().toPromise();
  
      if (data2.success === true) {
        this.personalidades2 = data2.message.map((item: any) => {
          // Comprueba si este chip está en la lista de personalidades del especialista
          const estaSeleccionado = this.personalidades.some(personalidad => personalidad.personalidad === item.personalidad);
          return { ...item, seleccionado: estaSeleccionado };
        }) as Personalidad[];
  
        this.hobbies2 = data2.message2.map((item: any) => {
          // Comprueba si este chip está en la lista de hobbies del especialista
          const estaSeleccionado = this.hobbies.some(hobbie => hobbie.hobbie === item.hobbie);
          return { ...item, seleccionado: estaSeleccionado };
        }) as Hobbie[];

        console.log(this.personalidades2);
        console.log(this.hobbies2);

        
  
        const modal = await this.modalController.create({
          component: AgregaryeditarPage,
          componentProps: {
            personalidades: this.personalidades2,
            hobbies: this.hobbies2,
            id: id
          }
        });
  
        await modal.present();

        const { data } = await modal.onWillDismiss();

        if (data) {
          console.log('Chips seleccionados:', data);

          const user = await this.recuperarId();

          if (user !== null) {
            let id_user = user.id;




          this.perfil.updatepersonalidadesyhobbies(id_user,id,data).subscribe(
            (data: any) => {
    
              if (data.success === true && data.message.length > 0) {
    
                this.presentSuccessAlert('Datos actualizados con exito');

                this.cargarpersonalidadesyhobies();
    
                
    
    
              }else {
                  console.error('Error: No se encontraron datos válidos en la respuesta.');
                  
                  // Puedes mostrar un mensaje de error al usuario si es necesario.
                }
    
            },
            (error: any) => {
              console.error('Error:', error);
              
              // Aquí puedes mostrar un mensaje de error al usuario si es necesario.
            }
            )

          } else {
            console.log('No se encontraron datos del usuario en las preferencias');
            // Lógica adicional en caso de que no haya datos de usuario
          }
    
          console.log(data);
          // Realiza la lógica para actualizar la base de datos con los datos de "data"
          // data puede contener los nuevos valores seleccionados por el usuario
        }



      } else {
        // Manejar el caso donde no hay datos
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error
    }
  }


  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  decodeBase64ToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'image/jpeg' });
  }
}



