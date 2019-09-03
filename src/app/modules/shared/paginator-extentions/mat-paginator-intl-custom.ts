import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService, TranslateParser } from '@ngx-translate/core';

export class MatPaginatorIntlCustom extends MatPaginatorIntl {

  private rangeLabelIntl: string;

  constructor(private translateService: TranslateService, private translateParser: TranslateParser) {
    super();
    this.getTranslations();
  }

  getTranslations() {
    this.translateService.get([
      'MatPaginatorIntlCustom.itemsPerPage',
      'MatPaginatorIntlCustom.nextPage',
      'MatPaginatorIntlCustom.previousPage',
      'MatPaginatorIntlCustom.range'
    ])
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['MatPaginatorIntlCustom.itemsPerPage'];
        this.nextPageLabel = translation['MatPaginatorIntlCustom.nextPage'];
        this.previousPageLabel = translation['MatPaginatorIntlCustom.previousPage'];
        this.rangeLabelIntl = translation['MatPaginatorIntlCustom.range'];
        this.changes.next();
      });
  }

  getRangeLabel = (page, pageSize, length) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return this.translateParser.interpolate(this.rangeLabelIntl, { startIndex, endIndex, length });
  };
}
