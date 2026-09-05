import { Pipe, PipeTransform } from '@angular/core';
import {safeCompare, SafeCompareOptions} from '@core';

@Pipe({
  name: 'safeCompare',
})
export class SafeComparePipe implements PipeTransform {
  transform(value: any, target: any, options?: SafeCompareOptions): boolean {
    return safeCompare(value, target, options);
  }
}
