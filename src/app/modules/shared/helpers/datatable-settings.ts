export class DatatableSettings implements DataTables.Settings {
  constructor(settings: Partial<DataTables.Settings>) {
    Object.assign(this, settings);
  }
  aoColumns: ({ title: string; data: string; orderable?: undefined; } | { title: string; data: any; orderable: boolean; })[];
  responsive = true;
  paging = true;
  pageLength = 10;
  columns = [];
  currentLang = (localStorage.getItem('language') == "uk") ? "//cdn.datatables.net/plug-ins/505bef35b56/i18n/Ukranian.json" : "//cdn.datatables.net/plug-ins/505bef35b56/i18n/English.json";
  language = {
    url: this.currentLang
  };
  oLanguage = {
    url: this.currentLang,
    sUrl :this.currentLang
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
