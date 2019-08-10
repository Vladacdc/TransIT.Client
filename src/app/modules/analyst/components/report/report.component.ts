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
  malfunc: Malfunction[] = [];
  malfuncGroups: Array<MalfunctionGroup>;
  malfuncSubgroups: MalfunctionSubgroup[] = [];

  selectedMalfunction: Malfunction;
  selectedMalfunctionGroup: MalfunctionGroup;
  selectedMalfunctionSubGroup: MalfunctionSubgroup;

  //tableGroup: any;
  tableSubGroup: any;
  tableSubSubGroup: any;

  clickAllowCheck: boolean;
  iteratorCheck: boolean;

  constructor(
    private malfuncService: MalfunctionService,
    private malfuncGroupService: MalfunctionGroupService,
    private malfuncSubGroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService,
    private statisticsService: StatisticsService
  ) {
    this.clickAllowCheck = true;
    this.iteratorCheck = true;
  }

  tdOption: any = {
    responsive: true,
    columns: [],
    scrollX: true,
    paging: true,
    language: {
      url: 'assets/language.json'
    }
  };

  ngOnInit() {
    this.malfuncSubGroupService.getEntities().subscribe(malfuncSubgroups => {
      this.malfuncSubgroups = malfuncSubgroups;
    });

    this.malfuncService.getEntities().subscribe(malfunc => {
      this.malfunc = malfunc;
    });

    this.tdOption.columns = [
      {
        title: 'Група',
        className: 'table-cell-edit',
        defaultContent: 'x'
      }
    ];
    this.vechicleTypeService.getEntities().subscribe(VehicleType => {
      VehicleType.forEach(a => {
        this.tdOption.columns.push({
          title: a.name,
          defaultContent: 'x'
        });
      });


      $('#example').DataTable(this.tdOption);

      $('#example tbody').on('click', 'td', this.showSubGroups(this));
    });

    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      malfuncGroups.forEach(malfuncGroup => { 
        this.statisticsService.GetMalfunctionGroupStatistics(malfuncGroup.name).subscribe(statistics => {
          $('#example').DataTable().row.add([malfuncGroup.name].concat(statistics)).draw();
          $('#example').DataTable().draw();
        });       
      });
    });
  }

  formatTable() {
    return `
    <div style ="background-color : #E4FBE2;">
    <table id="example2"  class="table table-bordered table-hover table-condensed" style="width:100%; background-color:rgba(0, 0, 0, 0.5);">
        </table>
    </div>`;
  }

  formatSubTable() {
    return `
    <div style = "background-color : #DFF2FD;">
    <table id="example3"  class="table table-bordered table-hover" style="width:100%; background-color: rgb(221, 195, 220)">
        </table>
      </div>`;
  }

  private showSubGroups(component: any) {
    return function() {
      if (component.clickAllowCheck) {
        const tr = $(this).closest('tr');
        const row = $("#example").DataTable().row(tr);
        component.selectedMalfunctionGroup = row.data();

        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } 
        else {
          row.child(component.formatTable()).show();
          tr.addClass('shown');
        }
        component.tdOption.retrieve = true;
        component.tdOption.paging = false;
        
        component.tableSubGroup = $('#example2').DataTable(component.tdOption);
        $('#example2 tbody').on('click', 'td', component.showSubRow(component));

        component.tableSubGroup.rows.add(component.filterMalfunctionSubGroup);
        component.tableSubGroup.draw();
      } 
      else {
        if (component.iteratorCheck) {
          component.clickAllowCheck = true;
        }
        component.iteratorCheck = true;
      }
    };
  }

  private showSubRow(component: any) {
    return function() {
      component.clickAllowCheck = false;
      component.iteratorCheck = false;
      const tr = $(this).closest('tr');
      const row = component.tableSubGroup.row(tr);
      component.selectedMalfunctionSubGroup = row.data();
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shownsub');
      } else {
        row.child(component.formatSubTable()).show();
        tr.addClass('shownsub');
      }

      component.tableSubSubGroup = $('#example3').DataTable(component.tdOption);
      component.tableSubSubGroup.rows.add(component.filterMalfunction);
      component.tableSubSubGroup.draw();
    };
  }

  get filterMalfunctionSubGroup(): Array<MalfunctionSubgroup> {
    return this.malfuncSubgroups.filter(x => {
      return x.malfunctionGroup !== null && x.malfunctionGroup.id === this.selectedMalfunctionGroup.id;
    });
  }

  get filterMalfunction(): Array<Malfunction> {
    return this.malfunc.filter(x => {
      return x.malfunctionSubgroup !== null && x.malfunctionSubgroup.id === this.selectedMalfunctionSubGroup.id;
    });
  }
}
