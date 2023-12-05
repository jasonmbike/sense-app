import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

// Importar el módulo de localización y los datos de localización para español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registrar los datos de localización para español
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule, 
            FormsModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAuthModule,
            AngularFirestoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}