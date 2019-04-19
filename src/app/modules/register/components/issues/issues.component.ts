import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { Vehicle } from '../../models/vehicle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  selectedIssue: Issue;

  private readonly tableConfig: DataTables.Settings = {
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    columns: [
      {
        title: 'Транспорт'
      },
      {
        title: 'Стан заявки'
      },
      {
        title: 'Несправність'
      },
      {
        title: 'Опис'
      },
      {
        title: '',
        orderable: false
      }
    ],
    scrollX: true
  };

  constructor(private issueService: IssueService, private toast: ToastrService) {}

  ngOnInit() {
    $('#issues').DataTable(this.tableConfig);

    this.issueService.getEntities().subscribe(data => {
      this.addTableData(data);
    });
  }

  private addTableData(newIssues: Issue[]) {
    this.issues = [...this.issues, ...newIssues];
    const view = newIssues.map(i => [
      this.vehicleName(i.vehicle),
      i.state.transName,
      i.malfunction.name,
      i.summary,
      `<button id="details-issue-${i.id}" class="btn" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></button>`
    ]);

    $('#issues')
      .dataTable()
      .api()
      .rows.add(view)
      .draw();

    $('button[id^="details-issue"]')
      .off('click')
      .on('click', event => {
        const idTokens = event.currentTarget.id.split('-');
        const id = parseInt(idTokens[idTokens.length - 1], 10);
        this.selectedIssue = this.issues.find(i => i.id === id);
      });
  }

  private removeTableData(issue: Issue) {
    const row: any = $('#issues')
      .DataTable()
      .row($(`button[id^="details-issue-${issue.id}"]`).parents('tr'));
    row.remove().draw(false);
  }

  deleteIssue() {
    this.issueService.deleteEntity(this.selectedIssue.id).subscribe(
      _ => {
        this.issues = this.issues.filter(i => i.id !== this.selectedIssue.id);
        this.removeTableData(this.selectedIssue);
      },
      _ => this.toast.error('Не вдалось видалити заявку', 'Помилка видалення')
    );
    const modalWindow: any = $('#editModal');
    modalWindow.modal('hide');
  }

  get selectedVehicle(): string {
    return this.selectedIssue && this.vehicleName(this.selectedIssue.vehicle);
  }

  get selectedGroup(): string {
    return this.selectedIssue && this.selectedIssue.malfunction.malfunctionSubgroup.malfunctionGroup.name;
  }

  get selectedSubgroup(): string {
    return this.selectedIssue && this.selectedIssue.malfunction.malfunctionSubgroup.name;
  }

  get selectedMalfunction(): string {
    return this.selectedIssue && this.selectedIssue.malfunction.name;
  }

  get selectedSummary(): string {
    return this.selectedIssue && this.selectedIssue.summary;
  }

  get canDeleteIssue() {
    return this.selectedIssue && this.selectedIssue.state.name.toLowerCase() === 'new';
  }

  private vehicleName(vehicle: Vehicle): string {
    return `${vehicle.brand} ${vehicle.model} ${vehicle.vincode || ''} ${vehicle.inventoryId || ''} ${vehicle.regNum || ''}`;
  }
}
