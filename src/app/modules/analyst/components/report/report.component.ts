import { Component, OnInit } from '@angular/core';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  malfunc: Malfunction[] = [];
  malfuncGroups: MalfunctionGroup[] = [];
  malfuncSubgroups: MalfunctionSubgroup[] = [];

  selectedMalfunction: Malfunction;
  selectedMalfunctionGroup: MalfunctionGroup;
  selectedMalfunctionSubGroup: MalfunctionSubgroup;

  tableGroup: DataTables.Api;
  tableSubGroup: DataTables.Api;
  tableSubSubGroup: DataTables.Api;

  clickAllowCheck: boolean;
  iteratorCheck: boolean;

  constructor(
    private malfuncService: MalfunctionService,
    private malfuncGroupService: MalfunctionGroupService,
    private malfuncSubGroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService
  ) {
    this.clickAllowCheck = true;
    this.iteratorCheck = true;
  }

  public tdOption: DataTables.Settings = {
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

    this.createColumns();

    this.tableGroup = $('#example').DataTable(this.tdOption);

    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      let currentRow: string[];

      malfuncGroups.forEach(malfunc => {
        currentRow=[malfunc.name]
        this.tdOption.columns.slice(1).forEach(col =>{
          currentRow.push(malfunc.name+col.title);  /////here will be count function
        });
        this.tableGroup.row.add(currentRow);
      })
      
      this.tableGroup.draw();
    });
  }

  private createColumns()
  {
    this.tdOption.columns = [
      {
        title: 'Група',
        className: 'table-cell-edit',
        defaultContent: ''
      }
    ];

    this.vechicleTypeService.getEntities().subscribe(VehicleType => {
      VehicleType.forEach(a => {
        this.tdOption.columns.push({
          title: a.name,
          defaultContent: '0'
        });
      });

      this.tableGroup.destroy();
      $('#example').empty();
      this.tableGroup = $('#example').DataTable(this.tdOption);

      $('#example tbody').on('click', 'td', this.showRow(this));
    });
  }

  private formatTable() {
    return `
    <div style ="background-color : #E4FBE2;">
    <table id="example2"  class="table table-bordered table-hover table-condensed" style="width:100%; background-color:rgba(0, 0, 0, 0.5);">
        </table>
    </div>`;
  }

  private formatSubTable() {
    return `
    <div style = "background-color : #DFF2FD;">
    <table id="example3"  class="table table-bordered table-hover" style="width:100%; background-color: rgb(221, 195, 220)">
        </table>
      </div>`;
  }
  //rework
  private showRow(component: any) {
    return function() {
      if (component.clickAllowCheck) {
        const tr = $(this).closest('tr');
        const row = component.tableGroup.row(tr);
        component.selectedMalfunctionGroup = row.data();

        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(component.formatTable()).show();
          tr.addClass('shown');
        }
        component.tdOption.retrieve = true;
        component.tdOption.paging = false;
        //component.tdOption.searching = false;
        component.tableSubGroup = $('#example2').DataTable(component.tdOption);
        $('#example2 tbody').on('click', 'td', component.showSubRow(component));
        
        component.filterMalfunctionSubGroup.forEach(malfSubGrup => {
          let currentRow=[malfSubGrup.name]
          component.tdOption.columns.slice(1).forEach(col =>{
            currentRow.push(malfSubGrup.name+col.title);  /////here will be count function
          });
          this.tableGroup.row.add(currentRow);
        });
        
        component.tableSubGroup.draw();
      } else {
        if (component.iteratorCheck) {
          component.clickAllowCheck = true;
        }
        component.iteratorCheck = true;
      }
    };
  }
  //rework
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
