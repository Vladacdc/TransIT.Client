export class DatatableSettings implements DataTables.Settings {
  constructor(settings: Partial<DataTables.Settings>) {
    Object.assign(this, settings);
  }
  responsive = true;
  paging = true;
  pageLength = 10;
  columns = [];
  language = {
    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
  };
  scrollX = true;
  drawCallback = function(settings) {
    let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
    let pagelength = $(this).closest('.dataTables_wrapper').find('.dataTables_length');
    let info = this.api().page.info();
    pagination.toggle(info.pages > 1);
    pagelength.toggle(this.api().data().length > 10 || info.page > 0 || info.recordsTotal>10);
  };
}
