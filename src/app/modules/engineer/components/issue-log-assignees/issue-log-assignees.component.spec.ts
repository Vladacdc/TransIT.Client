import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogAssigneesComponent } from './issue-log-assignees.component';

describe('IssueLogAssigneesComponent', () => {
  let component: IssueLogAssigneesComponent;
  let fixture: ComponentFixture<IssueLogAssigneesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueLogAssigneesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogAssigneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
