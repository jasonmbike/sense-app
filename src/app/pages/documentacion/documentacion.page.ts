import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DocumentacionService } from './service/documentacion.service';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


export interface DocumentoMetadata {
  nombre: string;
  idTipoDocumento: number;
  archivo: File; // Agregamos esta propiedad para los archivos
  id: string;
}


@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.page.html',
  styleUrls: ['./documentacion.page.scss'],
})
export class DocumentacionPage implements OnInit {

  @ViewChild('fileInput1') fileInput1!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;
  @ViewChild('fileInput3') fileInput3!: ElementRef;
  @ViewChild('fileInput4') fileInput4!: ElementRef;

  filesToUpload: File[] = [];
  documentNames: string[] = [];
  metadataFiles: DocumentoMetadata[] = [];
  tipoDocumentoSeleccionado: number =0;

  selectedFileNames1: string[] = [];
  selectedFileNames2: string[] = [];
  selectedFileNames3: string[] = [];
  selectedFileNames4: string[] = [];


  constructor(private dcService: DocumentacionService,
              private appc: AppComponent,
              private alertController: AlertController,
              private Router: Router,
              ) {}

  id_esp: any;
  id_tipdoc: any;

  ngOnInit() {
    this.recuperarId();
    this.mostrarIdUsuario();
  }

  onFileInput(buttonNumber: number, tipoDocumentoID: number) {
    // Al hacer clic en un botón, se almacena el ID del tipo de documento seleccionado
    this.tipoDocumentoSeleccionado = tipoDocumentoID;
  
    if (buttonNumber === 1) {
      this.fileInput1.nativeElement.click();
      console.log('id documento seleccionado:', this.tipoDocumentoSeleccionado)
    }
    if (buttonNumber === 2) {
      this.fileInput2.nativeElement.click();
      console.log('id documento seleccionado:',this.tipoDocumentoSeleccionado)
    }
    if (buttonNumber === 3) {
      this.fileInput3.nativeElement.click();
      console.log('id documento seleccionado:',this.tipoDocumentoSeleccionado)
    }
    if (buttonNumber === 4) {
      this.fileInput4.nativeElement.click();
      console.log('id documento seleccionado:',this.tipoDocumentoSeleccionado)
    }
  }
  
  

  async onFileInputChange(event: any, buttonNumber: number) {
    const fileList: FileList = event.target.files;
    const idEstado = 3; // ID de estado
  
    const user = await this.recuperarId();

    if (user !== null) {
      let id_user = user; 
      this.id_esp = user;

  
    if (fileList.length > 0) {
      
  
      for (let i = 0; i < fileList.length; i++) {
        const selectedFile: File = fileList[i];
  
        if (selectedFile.type === 'application/pdf') {
          
          if (buttonNumber === 1) {
            this.selectedFileNames1.push(selectedFile.name);
          } else if (buttonNumber === 2) {
            this.selectedFileNames2.push(selectedFile.name);
          } else if (buttonNumber === 3) {
            this.selectedFileNames3.push(selectedFile.name);
          } else if (buttonNumber === 4) {
            this.selectedFileNames4.push(selectedFile.name);
          }

          this.filesToUpload.push(selectedFile);
          this.documentNames.push(selectedFile.name);
  
          const metadata: DocumentoMetadata = {
            nombre: selectedFile.name,
            idTipoDocumento: buttonNumber,
            archivo: selectedFile,
            id: id_user.toString()
          };
  
          this.metadataFiles.push(metadata);
  
          const formData = new FormData();
          formData.append(`archivo-${i + 1}`, selectedFile);
          formData.append(`id_tipo_documento-${i + 1}`, buttonNumber.toString());
          formData.append(`nombre-${i + 1}`, selectedFile.name);
          formData.append(`id_especialista-${i + 1}`, id_user.toString());
          formData.append(`id_estado-${i + 1}`, idEstado.toString());
        } else {
          this.clearInput(buttonNumber);
        }
      }
    } else {
      console.error('No se pudo obtener el userID o no se seleccionaron archivos.');
    }

    } else {
      console.log('No se encontraron datos del usuario en las preferencias');
      // Lógica adicional en caso de que no haya datos de usuario
    }
  }
  
  

  clearInput(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.fileInput1.nativeElement.value = null;
    }
    if (buttonNumber === 2) {
      this.fileInput2.nativeElement.value = null;
    }
    if (buttonNumber === 3) {
      this.fileInput3.nativeElement.value = null;
    }
    if (buttonNumber === 4) {
      this.fileInput4.nativeElement.value = null;
    }
  }

  enviarArchivos(): void {
    if (this.filesToUpload.length > 0 && this.metadataFiles.length > 0) {
      const archivos = new FormData();
  
      this.filesToUpload.forEach((file, index) => {
        archivos.append(`archivo-${index + 1}`, file, file.name);
        archivos.append(`nombre-${index + 1}`, this.metadataFiles[index].nombre);
        archivos.append(`id_tipo_documento-${index + 1}`, this.metadataFiles[index].idTipoDocumento.toString());
      });
      archivos.append('id_especialista',this.id_esp);

      console.log('Archivos antes de enviar:', archivos);
  
      this.dcService.enviarArchivos(archivos).subscribe(
        (response: any) => {
          console.log('Archivos enviados con éxito', response);
          this.Router.navigate(['/home']);
          this.presentAlert();
          
          // Manejar la respuesta del servidor si es necesario
        },
        (error) => {
          console.error('Error al enviar los archivos', error);
          // Manejar el error en la solicitud
        }
      );
    } else {
      this.presentAlert2();
    }
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Sensecional!',
      subHeader: 'Envio realizado',
      message: 'Archivo(s) enviados con exito!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Atencion!',
      message: 'No se han seleccionado archivos para enviar.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  
  async recuperarId(): Promise<number | null> {
    const user = await this.appc.getUser();
  
    if (user) {
      const userID = user.id;
      // Aquí puedes utilizar userID para acceder al ID del usuario
      console.log('id_user: '+userID);
      return userID;
    } else {
      // No se encontraron datos del usuario en las preferencias, devolver null o un valor predeterminado
      return null;
    }
  }

  async mostrarIdUsuario() {
    const userID = await this.recuperarId();
    if (userID) {
      console.log('ID del usuario:', userID);
    } else {
      console.log('No se encontró el ID del usuario');
    }
  }
  
}
