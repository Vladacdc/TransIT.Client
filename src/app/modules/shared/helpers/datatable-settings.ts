export class DatatableSettings implements DataTables.Settings {
  constructor(settings: Partial<DataTables.Settings>) {
    Object.assign(this, settings);
  }
  pageLength = 10;
  //serverSide = true;
  //processing = true;
  columns = [];
  language = {
    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
  };
  scrollX = true;
  ajax = () => {};
  drawCallback = function(settings) {
    let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
    let pagelength = $(this).closest('.dataTables_wrapper').find('.dataTables_length');
    let tablesearch = $(this).closest('.dataTables_wrapper').find('.dataTables_filter')
    pagination.toggle(this.api().page.info().pages > 1);
    pagelength.toggle(this.api().data().length > 10);
  };
  select: {
    style: 'single'
  };
}
