import { Pipe, PipeTransform } from '@angular/core';
import {hasValue} from '@core/utils/has-value.util';

@Pipe({
  name: 'hasValue',
})
export class HasValuePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return hasValue(value);
  }
}
