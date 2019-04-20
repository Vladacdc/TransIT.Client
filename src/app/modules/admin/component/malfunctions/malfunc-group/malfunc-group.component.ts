import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MalfuncGroup } from '../../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../../services/malfunc-group.service';

@Component({
  selector: 'app-malfunc-group',
  templateUrl: './malfunc-group.component.html',
  styleUrls: ['./malfunc-group.component.scss']
})
export class MalfuncGroupComponent implements OnInit {
  malfuncGroups: MalfuncGroup[];
  dataTable:any;
   malfuncGroup : MalfuncGroup={
     name:''
   };
   private readonly tableParams = {
     columnDefs: [
      {
         targets: [1,2],
         
         orderable: false
       }
     ],
     language: {
       url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
     },
     "scrollX": true
   };
  constructor(private malfunGroupService: MalfuncGroupService,private chRef:ChangeDetectorRef) { }

  ngOnInit() {
     this.malfunGroupService.getEntities().subscribe(malfuncGroups=> {
       this.malfuncGroups=malfuncGroups;
       this.chRef.detectChanges();
       const table:any = $('table');
       this.dataTable = table.DataTable(this.tableParams);
       
    });
  }
}
