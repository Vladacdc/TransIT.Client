import { Component, OnInit } from '@angular/core';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  private tableMalfunction: DataTables.Api;

  malfunction: Malfunction;
  malfunctions: Array<Malfunction>;

  ngOnInit() {
    this.tableMalfunction = $('#reportTable').DataTable({
      responsive: true,
      columns: [
        {
          className: 'details-control',
          orderable: false,
          data: null,
          defaultContent: ''
        },
        { title: 'Помилки', data: 'name', defaultContent: '' }
      ],

      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });

    $('.datatables tbody').on('click', 'td.details-control', function() {
      var tr = $(this).closest('tr'),
        row = this.tableMalfunction.row(tr);

      if (row.child.isShown()) {
        tr.next('tr').removeClass('details-row');
        row.child.hide();
        tr.removeClass('shown');
      } else {
        row.child(format(row.data())).show();
        tr.next('tr').addClass('details-row');
        tr.addClass('shown');
      }
    });

    this.malfuncService.getEntities().subscribe(malfunctions => {
      this.malfunctions = malfunctions;
      this.tableMalfunction.rows.add(this.malfunctions);
      this.tableMalfunction.draw();
    });
  }

  constructor(private malfuncService: MalfunctionService) {}
}
function format(data) {
  return '<div> rthesth</div>';
}
