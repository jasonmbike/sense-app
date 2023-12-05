import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HomeService } from './services/home.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  

  @ViewChild('mySlider', { static: true }) slides: IonSlides | undefined; 
  menuData: any;
  verificado: boolean = false;
  user: boolean = false;
  menuActivado: boolean = false;
  tipo_usuario: any;
  


  constructor(private Router: Router, private appc: AppComponent, private homeservice: HomeService,private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      // Realiza acciones específicas o recarga el componente según sea necesario
      this.recuperarId();
  });
    
    
  }

  ionViewWillEnter() {
    // Este código se ejecutará cada vez que la página esté a punto de mostrarse
    this.verificarUsuario();
  }


  nextSlide() {
    (this.slides)
    if(this.slides)
      this.slides.slideNext();
  }

  Especialistas(){
    this.Router.navigate(['/especialista']);
  }

  Documentacion(){
    this.Router.navigate(['/documentacion']);
  }

  Reservas(){
    this.Router.navigate(['/reservas']);
  }

  IngresarHora(){
    this.Router.navigate(['/agregarhorario']);
  }

  Historial(){
    this.Router.navigate(['/historial']);
  }

  EditarHorario(){
    this.Router.navigate(['/mihorarioesp']);
  }

  BuscarEsp() {
    this.Router.navigate(['/buscaresp']);
  }



  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.verificarUsuario();
      event.target.complete();
    }, 2000);
  }


  async verificarUsuario() {
    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user;

      if(this.tipo_usuario == 1) {
        this.user = true;

        this.homeservice.verificarUser(id_user).subscribe(
          (data: any) => {
            if (data.success === true && data.message.length > 0) {
  
              console.log(data.message[0].ID_ESTADO);
  
              if (data.message[0].ID_ESTADO == 1) {
                console.log('aqui');
                this.menuActivado = true;
                this.verificado = false;
              } else {
                this.verificado = true;
                this.menuActivado = false;
              }
            
            } else {
              console.error('Error: No se encontraron datos válidos en la respuesta.');
            
            }
          },(error: any) => {
              console.error('Error:', error);
            }
          );


      } else {
        this.user = false;
      }

      
 

    } else {
      console.log('No se encontraron datos del usuario en las preferencias');
      // Lógica adicional en caso de que no haya datos de usuario
    }
    


  }



  async recuperarId(): Promise<number | null> {
    const user = await this.appc.getUser();
  
    if (user) {
      const userID = user.id;
      const tipo_usuario = user.tipo_usuario;
      const email = user.email;

      this.tipo_usuario = tipo_usuario;
      // Aquí puedes utilizar userID para acceder al ID del usuario
      console.log('id_user: '+userID);
      console.log('tipo_usuario: '+tipo_usuario);
      console.log('email: '+email);
      return userID;
    } else {
      // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
      return null;
    }
  }

}
