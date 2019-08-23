import {MatPaginatorIntl} from '@angular/material/paginator';

export class MatPaginatorIntlUkr extends MatPaginatorIntl {
  itemsPerPageLabel = 'Записів на сторінці:';
  nextPageLabel = 'Наступна сторінка';
  previousPageLabel = 'Попередня сторінка';

  getRangeLabel = function (pageIndex, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 з ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = pageIndex * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
      
    return startIndex + 1 + ' - ' + endIndex + ' з ' + length;
  };
}
