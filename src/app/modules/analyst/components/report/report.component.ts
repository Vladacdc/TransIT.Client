import { Component, OnInit } from '@angular/core';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  
  dtOption: DataTables.Settings = {
    columns: [],
    responsive: true,
    scrollX: true,
    paging: true,
    language: {
      url: 'assets/language.json'
    }
  };

  constructor(
    private malfunctionService: MalfunctionService,
    private malfunctionGroupService: MalfunctionGroupService,
    private malfunctionSubgroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService,
    private statisticsService: StatisticsService
  ) {
  }


  ngOnInit() {

    this.dtOption.columns = [
      {
        title: 'Група',
        className: 'table-cell-edit',
        defaultContent: 'x'
      }
    ];

    this.vechicleTypeService.getEntities().subscribe(vehicleTypes => {
      vehicleTypes.forEach(vType => {
        this.dtOption.columns.push({
          title: vType.name,
          defaultContent: 'x'
        });
      });

      $('#group-table').DataTable(this.dtOption);
      $('#group-table tbody').on('click', 'td', this.showSubGroups(this));
    });

    this.malfunctionGroupService.getEntities().subscribe(malfuncGroups => {
      malfuncGroups.forEach(malfuncGroup => { 
        this.statisticsService.GetMalfunctionGroupStatistics(malfuncGroup.name).subscribe(statistics => {
          $('#group-table').DataTable().row.add([malfuncGroup.name].concat(statistics)).draw();
        });       
      });
    });
  }


  private showSubGroups(component: ReportComponent) {
    return function() {
      const tr = $(this).closest('tr');
      const parentRow = $("#group-table").DataTable().row(tr);

      if (parentRow.child.isShown()) {
        parentRow.child.hide();
        tr.removeClass('shown-subgroups');
      } 
      else {
        parentRow.child(component.formatSubgroupTable()).show();
        tr.addClass('shown-subgroups');
        let buff = $("#group-table").DataTable().row(tr).data();
        
        if(buff == undefined) return;

        let groupName = buff[0];

        component.dtOption.retrieve = true;
        component.dtOption.paging = false;
        component.dtOption.columns[0].title = "Підгрупа";

        $('#subgroup-table').DataTable(component.dtOption);
        $('#subgroup-table tbody').on('click', 'td', component.showMalfunctions(component));
        
        component.malfunctionSubgroupService.getByGroupName(groupName).subscribe(malfunctionSubgroups => {     
          malfunctionSubgroups.forEach(malfuncSubgroup => {
            component.statisticsService.GetMalfunctionSubGroupStatistics(malfuncSubgroup.name).subscribe(row => {
              $('#subgroup-table').DataTable().row.add([malfuncSubgroup.name].concat(row)).draw();
            });
          });
        });
      }
    }
  }

  
  private showMalfunctions(component: ReportComponent) {
    return function() {
      const tr = $(this).closest('tr');
      const parentRow = $("#subgroup-table").DataTable().row(tr);

      if (parentRow.child.isShown()) {
        parentRow.child.hide();
        tr.removeClass('shown-malfuncs');
      } 
      else {
        parentRow.child(component.formatMalfunctionTable()).show();
        tr.addClass('shown-malfuncs');
        let subgroupName = $("#subgroup-table").DataTable().row(tr).data()[0];

        component.dtOption.retrieve = true;
        component.dtOption.paging = false;
        component.dtOption.columns[0].title = "Несправність";

        $('#malfunction-table').DataTable(component.dtOption);
                  
        component.malfunctionService.getBySubgroupName(subgroupName).subscribe(malfunctions => {     
          malfunctions.forEach(malfunc => {
            component.statisticsService.GetMalfunctionStatistics(malfunc.name).subscribe(row => {
              $('malfunction-table').DataTable(component.dtOption).row.add([malfunc.name].concat(row)).draw();
            });
          });
        });
      }
    }
  } 

  formatSubgroupTable() {
    return `
    <div style ="background-color : #E4FBE2;">
    <table id="subgroup-table"  class="display" style="width:100%; background-color:rgba(0, 0, 0, 0.5);">
        </table>
    </div>`;
  }

  formatMalfunctionTable() {
    return `
    <div style = "background-color : #DFF2FD;">
    <table id="malfunction-table"  class="display" style="width:100%; background-color: rgb(221, 195, 220)">
        </table>
    </div>`;
  }
}
