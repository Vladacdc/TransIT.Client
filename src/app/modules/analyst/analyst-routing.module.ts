import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalystComponent } from './components/analyst/analyst.component';
import { ReportComponent } from './components/report/report.component';
import { DictionaryComponent } from '../shared/components/dictionaries/dictionary.component';
import { GlobalDocumentComponent } from '../shared/components/global-document/global-document.component';
import { SupplierComponent } from '../shared/components/supplier/supplier.component';
import { GlobalIssueComponent } from '../shared/components/global-issue/global-issue.component';

const routes: Routes = [
  {
    path: '',
    component: AnalystComponent,
    children: [
      { path: 'issues', component: GlobalIssueComponent },
      { path: 'report', component: ReportComponent },
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'document', component:GlobalDocumentComponent},      
      { path: 'supplier', component:SupplierComponent},
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule {}
