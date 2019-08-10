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
  malfunctionGroups: MalfunctionGroup[] = [];
  malfunctionSubgroups: MalfunctionSubgroup[] = [];
  malfunctions: Malfunction[] = [];

  
  groupsTable: DataTables.Api;
  subgroupTable: DataTables.Api;
  malfunctionsTable: DataTables.Api;
  

  clickAllowCheck: boolean;
  iteratorCheck: boolean;

  constructor(
    private malfunctionService: MalfunctionService,
    private malfunctionGroupService: MalfunctionGroupService,
    private malfunctionSubgroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService,
    private statisticsService: StatisticsService
  ) {
    this.clickAllowCheck = true;
    this.iteratorCheck = true;
  }

  dtOption: DataTables.Settings = {
    columns: [],
    responsive: true,
    scrollX: true,
    paging: true,
    language: {
      url: 'assets/language.json'
    }
  };

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
          $('#group-table').DataTable().draw();
        });       
      });
    });
  }


  private showSubGroups(component: ReportComponent) {
    return function() {
      if (component.clickAllowCheck) {
        const tr = $(this).closest('tr');
        const parentRow = $("#group-table").DataTable().row(tr);

        if (parentRow.child.isShown()) {
          parentRow.child.hide();
          tr.removeClass('shown');
        } 
        else {
          parentRow.child(component.formatSubgroupTable()).show();
          tr.addClass('shown');
          let groupName = $("#group-table").DataTable().row(tr).data()[0];///

          component.dtOption.retrieve = true;
          component.dtOption.paging = false;
          component.dtOption.columns[0].title = "Підгрупа";

          $('#subgroup-table').DataTable(component.dtOption);
          $('#subgroup-table tbody').on('click', 'td', component.showMalfunctions(component));
          
          component.malfunctionSubgroupService.getByGroupName(groupName).subscribe(malfunctionSubgroups => {     
            malfunctionSubgroups.forEach(malfuncSubgroup => {
              component.statisticsService.GetMalfunctionSubGroupStatistics(malfuncSubgroup.name).subscribe(row => {
                $('#subgroup-table').DataTable().row.add([malfuncSubgroup.name].concat(row)).draw();
                $('#subgroup-table').DataTable().draw();
              });
            });
          });

          /*
          //malfuncSubgroups is not defined
          component.malfunctionSubgroupService.getEntities().subscribe(malfuncSubgroups => {     
            let filteredData = malfuncSubgroups.filter(malfuncSubgroup => {

              malfuncSubgroup.malfunctionGroup !== null && malfuncSubgroup.malfunctionGroup.id === (row.data()[0]).id;

            })
            filteredData.forEach(malfuncSubgroup => {
              component.statisticsService.GetMalfunctionSubGroupStatistics(malfuncSubgroup.name).subscribe(row => {
                $('#subgroup-table').DataTable().row.add([malfuncSubgroup.name].concat(row)).draw();
                $('#subgroup-table').DataTable().draw();
              });
            });
          });*/
        }
      } 
      else {
        if (component.iteratorCheck) {
          component.clickAllowCheck = true;
        }
        component.iteratorCheck = true;
      }
    };
  }

  
  private showMalfunctions(component: ReportComponent) {
    return function() {
      /*component.clickAllowCheck = false;
      component.iteratorCheck = false;
      const tr = $(this).closest('tr');
      const row = component.tableSubGroup.row(tr);
      component.selectedMalfunctionSubGroup = row.data();
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shownsub');
      } else {
        row.child(component.formatMalfunctionTable()).show();
        tr.addClass('shownsub');
      }

      $('#malfunction-table').DataTable(component.dtOption);
      $('#malfunction-table').DataTable().rows.add(component.filterMalfunction);
      $('#malfunction-table').DataTable().draw();*/
    };
  } 

  formatSubgroupTable() {
    return `
    <div style ="background-color : #E4FBE2;">
    <table id="subgroup-table"  class="table table-bordered table-hover table-condensed" style="width:100%; background-color:rgba(0, 0, 0, 0.5);">
        </table>
    </div>`;
  }

  formatMalfunctionTable() {
    return `
    <div style = "background-color : #DFF2FD;">
    <table id="malfunction-table"  class="table table-bordered table-hover" style="width:100%; background-color: rgb(221, 195, 220)">
        </table>
      </div>`;
  }

}
