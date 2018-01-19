import { Pipe, PipeTransform }   from '@angular/core';

@Pipe({name: 'orderBy'})
export class orderDateByPipe implements PipeTransform {

  transform(value: Array<any>, field: string): any {

    if(value == null) {
      return null;
    } else {
      return [...value].sort((a, b) => {
        if(a[field] < b[field]) return 1;
        if(a[field] > b[field]) return -1;
      });
    }

  }
  
}