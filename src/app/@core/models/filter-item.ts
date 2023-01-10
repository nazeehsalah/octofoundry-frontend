import { FormControl } from '@angular/forms';

export class FilterItem {
  title: string = '';
  type: 'text' | 'dropdown' | 'date' = 'text';
  api?: string;
  multiple?: boolean;
  values?: any[];
}
