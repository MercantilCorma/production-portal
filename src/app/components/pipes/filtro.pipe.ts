import { Pipe, PipeTransform } from '@angular/core';
import { Orders } from '../interfaces/orders.interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(ordenes: Orders[], buscar:string=''): Orders[] {

    console.log(ordenes);

    if(buscar.length == 0){
      return ordenes;
    }
      const filtroordes  = ordenes.filter(orde => orde.sucursal.includes(buscar));
      return filtroordes;



    /*   const filtroordes2 = ordenes.filter(orde => orde.sucursal.includes(buscar));
      return filtroordes2; */


  }

}
