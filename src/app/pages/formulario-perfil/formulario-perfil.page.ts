import { Component, OnInit } from '@angular/core';
import { FormularioPerfilService } from './service/formulario-perfil.service';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';




@Component({
  selector: 'app-formulario-perfil',
  templateUrl: './formulario-perfil.page.html',
  styleUrls: ['./formulario-perfil.page.scss'],
})
export class FormularioPerfilPage implements OnInit {

  
  generoOpciones: any = [] ;
  regionOpciones: any = [] ;
  comunaOpciones: any = [] ;

  
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
  id_genero: any;
  region: any;
  comuna:any;
  genero: any;
  

  constructor(private formularioPerfil: FormularioPerfilService,
              private appc: AppComponent,
              private alertController: AlertController,
              private Router: Router) { }

    ngOnInit() {
    this.recuperarId();
    Camera.requestPermissions();
    
    this.obtenerRegiones();
    this.obtenerPerfil();
    //this.takePicture();
    //this.obtenerComunas();
    console.log("prueba comunas", this.id_comuna);
    console.log("prueba region al ingresar", this.id_region);
    
  }

  ionViewWillEnter() {
    //this.recuperarId();
    //Camera.requestPermissions();
    this.obtenerGeneros();
    this.obtenerRegiones();
    this.obtenerPerfil();
    //this.takePicture();
    this.obtenerComunas();
  }

  async abrirSelectorDeImagen() {
    const alert = await this.alertController.create({
      header: 'Seleccionar imagen',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.seleccionarImagen('camara');
          }
        },
        {
          text: 'Galería',
          handler: () => {
            this.seleccionarImagen('galeria');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async seleccionarImagen(origen: string) {
    try {
      let sourceType: CameraSource;

      if (origen === 'camara') {
        sourceType = CameraSource.Camera;
      } else if (origen === 'galeria') {
        sourceType = CameraSource.Photos;
      } else {
        console.error('Origen no válido');
        return;
      }

      const image = await Camera.getPhoto({
        source: sourceType,
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });

      // image.base64String contiene la imagen en formato base64
      this.imagen_perfil = 'data:image/jpeg;base64,' + image.base64String;
    
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  }
    


  obtenerGeneros(){
    this.formularioPerfil.obtenerGeneros().subscribe(
      (response) => {
        this.generoOpciones = response.generos;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

  }

  obtenerRegiones(){
    this.formularioPerfil.obtenerRegiones().subscribe(
      (response) => {
        this.regionOpciones = response.Regiones;
        // Comprueba si regionOpciones está definido y tiene elementos
        if (this.regionOpciones && this.regionOpciones.length > 0) {
          // Encuentra y selecciona la región del especialista
          const regionEspecialista = this.regionOpciones.find((region:any) => region.nombre === this.region);
          if (regionEspecialista) {
            this.id_region = regionEspecialista.id_region;
            //this.obtenerComunas();
          }
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  obtenerComunas() {
    if (this.id_region) {
      this.formularioPerfil.obtenerComunas(this.id_region).subscribe(
        (response) => {
          this.comunaOpciones = response.Comunas;
          // Comprueba si comunaOpciones está definido y tiene elementos
          if (this.comunaOpciones && this.comunaOpciones.length > 0) {
            // Encuentra y selecciona la comuna del especialista
            const comunaEspecialista = this.comunaOpciones.find((comuna:any) => comuna.nombre === this.comuna);
            if (comunaEspecialista) {
              this.id_comuna = comunaEspecialista.id_comuna;
            }
          }
        },
        (error) => {
          console.error('Error al obtener las comunas:', error);
        }
      );
    } else {
      console.warn('ID de región no válido.');
    }
  }
  

  async actualizarUsuario(){

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user.id;
      let tipo_user = user.tipo_usuario;

     
      if (this.imagen_perfil !== null) {

        if (this.imagen_perfil.startsWith('data:image/jpeg;base64,')) {
          console.log('imagen en base64');
        } else {
          let startIndex = this.imagen_perfil.indexOf('public');
          this.imagen_perfil = this.imagen_perfil.substring(startIndex);
  
          console.log('aqui'+ this.imagen_perfil);
        }
      }
     
      const datos = {
        nombre : this.nombre_usuario,
        ap_paterno: this.ap_paterno_usuario,
        ap_materno: this.ap_materno_usuario,
        email: this.email_usuario,
        edad: this.edad_usuario,
        nacionalidad:this.nacionalidad_usuario,
        direccion: this.direccion_usuario,
        rut: this.rut_usuario,
        celular: this.celular_usuario,
        id_comuna: this.id_comuna,
        id_region: this.id_region,
        id_genero: this.id_genero,
        imagen_perfil: this.imagen_perfil,
      };

      console.log(this.imagen_perfil);

      
    this.formularioPerfil.actualizarUsuario(id_user, tipo_user, datos
   ).subscribe(
       (response) => {
        console.log('Datos actualizados correctamente:', response);
         this.presentAlert();
       },
       (error) => {
         console.error('Error al obtener los usuarios:', error);
       }
     );
    } else {
      console.log('No se encontraron datos del usuario en las preferencias');
      // Lógica adicional en caso de que no haya datos de usuario
    }
    

    if (this.imagen_perfil !== null) {
      if (this.imagen_perfil.startsWith('data:image/jpeg;base64,')) {
        console.log('imagen en base64');
      } else {

        let prefix = 'https://www.sensecional.xyz/sense/';
        this.imagen_perfil = prefix + this.imagen_perfil;
        
      }
  }

    


  }

 

  async obtenerPerfil() {

    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user.id;
      let tipo_user = user.tipo_usuario;

    this.formularioPerfil.obtenerUsuario(id_user, tipo_user).subscribe(
      (response) => {

        if (response.success) {

          console.log(response.usuarios[0]);
          

          if (response.usuarios[0].ID_TIPO_USUARIO == 1) {
            this.id_usuario = response.usuarios[0].ID_ESPECIALISTA;
            this.nombre_usuario = response.usuarios[0].NOMBRE_ESPECIALISTA;
            this.ap_paterno_usuario = response.usuarios[0].AP_PATERNO_ESPECIALISTA;
            this.ap_materno_usuario = response.usuarios[0].AP_MATERNO_ESPECIALISTA;
            this.email_usuario = response.usuarios[0].EMAIL_ESPECIALISTA;
            this.edad_usuario = response.usuarios[0].EDAD_ESPECIALISTA;
            this.nacionalidad_usuario = response.usuarios[0].NACIONALIDAD_ESPECIALISTA;
            this.direccion_usuario = response.usuarios[0].DIRECCION;
            this.rut_usuario = response.usuarios[0].RUT;
            this.celular_usuario = response.usuarios[0].CELULAR;
            this.id_region = response.usuarios[0].REGION;
            this.id_comuna = response.usuarios[0].COMUNA;
            this.id_genero = response.usuarios[0].GENERO;
            this.region = response.usuarios[0].REGION;
            this.comuna = response.usuarios[0].COMUNA;
            this.imagen_perfil = 'https://www.sensecional.xyz/sense/' + response.usuarios[0].IMAGEN_PERFIL;
            if (this.imagen_perfil == 'https://www.sensecional.xyz/sense/null') {
              this.imagen_perfil = null;
              }
            this.genero = response.usuarios[0].GENERO;

        
          } else {
            this.id_usuario = response.usuarios[0].ID_USUARIO;
            this.nombre_usuario = response.usuarios[0].NOMBRE_USUARIO;
            this.ap_paterno_usuario = response.usuarios[0].AP_PATERNO_USUARIO;
            this.ap_materno_usuario = response.usuarios[0].AP_MATERNO_USUARIO;
            this.email_usuario = response.usuarios[0].EMAIL_USUARIO;
            this.edad_usuario = response.usuarios[0].EDAD_USUARIO;
            this.nacionalidad_usuario = response.usuarios[0].NACIONALIDAD_USUARIO;
            this.direccion_usuario = response.usuarios[0].DIRECCION_USUARIO;
            this.rut_usuario = response.usuarios[0].RUT_USUARIO;
            this.celular_usuario = response.usuarios[0].CELULAR_USUARIO;
            this.id_region = response.usuarios[0].REGION;
            this.id_comuna = response.usuarios[0].COMUNA;
            this.id_genero = response.usuarios[0].GENERO_USUARIO;
            this.region = response.usuarios[0].REGION;
            this.comuna = response.usuarios[0].COMUNA;
            this.imagen_perfil = 'https://www.sensecional.xyz/sense/' + response.usuarios[0].IMAGEN_PERFIL;
            if (this.imagen_perfil == 'https://www.sensecional.xyz/sense/null') {
              this.imagen_perfil = null;
              }
            this.genero = response.usuarios[0].GENERO;
          } 
          

          this.formularioPerfil.obtenerRegiones().subscribe(
            (response) => {
              this.regionOpciones = response.Regiones;
              const regionEspecialista = this.regionOpciones.find((region:any) => region.nombre === this.region);
              if (regionEspecialista) {
                this.id_region = regionEspecialista.id_region;
                // Luego de seleccionar la región, obtén las comunas
                this.formularioPerfil.obtenerComunas(this.id_region).subscribe(
                  (response) => {
                    this.comunaOpciones = response.Comunas;
                    const comunaEspecialista = this.comunaOpciones.find((comuna:any) => comuna.nombre === this.comuna);
                    if (comunaEspecialista) {
                      this.id_comuna = comunaEspecialista.id_comuna;
                    }
                  },
                  (error) => {
                    console.error('Error al obtener las comunas:', error);
                  }
                );
              }
            },
            (error) => {
              console.error('Error al obtener los usuarios:', error);
            }
          );

          this.formularioPerfil.obtenerGeneros().subscribe(
            (response) => {
              this.generoOpciones = response.generos;
              // Encuentra y selecciona el género del especialista
              const generoEspecialista = this.generoOpciones.find((genero:any) => genero.genero === this.genero);
              if (generoEspecialista) {
                this.id_genero = generoEspecialista.id_genero;
              }
            },
            (error) => {
              console.error('Error al obtener los géneros:', error);
            }
          );





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

  async recuperarId(): Promise<any | null> {
    const user = await this.appc.getUser();
  
    if (user) {
      const userID = user.id;
      const userTipo = user.tipo_usuario;
      // Aquí puedes utilizar userID para acceder al ID del usuario
      console.log('id actual: '+ userID);
      console.log('tipo usuario:  '+ user.tipo_usuario);

      return user;
    } else {
      // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
      return null;
    }
  }

  volveralPerfil(){
    this.Router.navigate(['/perfil']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Sensecional!',
      message: 'Datos actualizados correctamente',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
