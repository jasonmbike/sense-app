import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { defineCustomElements } from '@ionic/pwa-elements/loader';



interface User {
  id: number;
  tipo_usuario: number;
  email: string;
  isLoggedIn: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public email: string = '';
  public tipo_usuario: number = 0;

  constructor(private menuController: MenuController, private router: Router,
              private nav: NavController) {defineCustomElements(window);}

  async redirectToPage(page: string) {
    this.menuController.close();

    if (page === 'login') {
      await this.cerrarSesion();
    } else {
      this.nav.navigateBack([`/${page}`]);
    }
  }

  async ngOnInit() {
    //await this.recuperarId();
  }

  ionViewWillEnter() {
    // Este código se ejecutará cada vez que la página esté a punto de mostrarse
    //this.recuperarId();
  }

  async cerrarSesion() {
    // Realiza cualquier acción necesaria para cerrar sesión
    await Preferences.remove({ key: 'user' });

    // Redirige al usuario a la página de inicio de sesión
    this.nav.navigateBack(['/login']);
  }

  public setUser = async (user: User) => {
    await Preferences.set({ key: 'user', value: JSON.stringify(user) });
    this.email = user.email;
    this.tipo_usuario = user.tipo_usuario;


  };

  public getUser = async (): Promise<User | null> => {
    const { value } = await Preferences.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  };

  public isLoggedIn = async (): Promise<boolean> => {
    const user = await this.getUser();
    return !!user && user.isLoggedIn;
  };

  // async recuperarId(): Promise<number | null> {
  //   const user = await this.getUser();

  //   if (user) {
  //     const userID = user.id;
  //     const tipo_usuario = user.tipo_usuario;
  //     const email = user.email;

  //     // Asigna el tipo a la propiedad tipo_usuario
  //     this.tipo_usuario = tipo_usuario;

  //     // Asigna el email a la propiedad email
  //     this.email = email;

  //     console.log('id_user: ' + userID);
  //     console.log('tipo_usuario: ' + tipo_usuario);
  //     console.log('email: ' + email);

  //     return userID;
  //   } else {
  //     // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
  //     return null;
  //   }
  // }
}
