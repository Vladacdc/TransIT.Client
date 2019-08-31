import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class MatPaginatorIntlCustom extends MatPaginatorIntl {
  itemsPerPageLabel = this.translate.instant('MatPaginatorIntlCustom.itemsPerPage');
  nextPageLabel = this.translate.instant('MatPaginatorIntlCustom.nextPage');
  previousPageLabel = this.translate.instant('MatPaginatorIntlCustom.previousPage');

  constructor(private translate: TranslateService) {
    super();
  }

  getRangeLabel = function (pageIndex, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.translate.instant('MatPaginatorIntlCustom.of')} ` + length;
    }
    length = Math.max(length, 0);
    const startIndex = pageIndex * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
      
    return startIndex + 1 + ' - ' + endIndex + ` ${this.translate.instant('MatPaginatorIntlCustom.of')} ` + length;
  };
}
