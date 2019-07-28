export class DatatableSettings implements DataTables.Settings {
  constructor(settings: Partial<DataTables.Settings>) {
    Object.assign(this, settings);
  }
  pagingType = 'full_numbers';
  pageLength = 10;
  serverSide = true;
  processing = true;
  columns = [];
  language = {
    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
  };
  scrollX = true;
  ajax = () => {};
  drawCallback = settings => {
    $(settings.nTableWrapper)
      .find('.pagination, .dataTables_length')
      .toggle(settings._iRecordsTotal > 10);
  }
}
