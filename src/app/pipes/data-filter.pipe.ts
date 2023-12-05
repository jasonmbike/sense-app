// Crea un nuevo archivo, por ejemplo, date-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate',
})
export class FilterByDatePipe implements PipeTransform {
  transform(items: any[], filtro: { mes: string, anio: string }): any[] {
    if (!filtro.mes && !filtro.anio) {
      return items;
    }

    return items.filter((especialista) => {
      const fechaReserva = new Date(especialista.FECHA_RESERVA);
      const mesReserva = (fechaReserva.getMonth() + 1).toString().padStart(2, '0');
      const anioReserva = fechaReserva.getFullYear().toString();

      const coincideMes = !filtro.mes || mesReserva === filtro.mes;
      const coincideAnio = !filtro.anio || anioReserva === filtro.anio;

      return coincideMes && coincideAnio;
    });
  }
}
