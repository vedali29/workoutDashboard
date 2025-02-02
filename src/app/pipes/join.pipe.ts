import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true
})
export class JoinPipe implements PipeTransform {

  transform(array: any[], separator: string = ','): string {
    return array.join(separator);
  }

}
