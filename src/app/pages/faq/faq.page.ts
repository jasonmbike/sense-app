import { Component, OnInit } from '@angular/core';
import { FaqService } from './service/faq.service';


interface Faq {
  ID_FAQ: number;
  TITULO: string;
  DESCRIPCION: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  faqs: Faq[] = []; // Usar un array para almacenar múltiples preguntas

  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.obtenerFaq();
  }

  obtenerFaq() {
    this.faqService.obtenerFaq().subscribe(
      (response) => {
        if (response.success) {
          this.faqs = response.faqs; // Asignar la lista de preguntas frecuentes al array
          console.log('FAQ obtenidos correctamente:', this.faqs);
        } else {
          console.error('No se pudieron obtener los FAQ:', response.message);
        }
      },
      (error) => {
        console.error('Error al obtener los FAQ:', error);
      }
    );
  }
}
